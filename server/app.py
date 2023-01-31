# app.py

# Required imports
import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from firebase_admin import credentials, firestore, initialize_app
import json
import random

# Initialize Flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Initialize Firestore DB
cred = credentials.Certificate('server/key.json')
default_app = initialize_app(cred)
db = firestore.client()
cards_ref = db.collection('cards')
player_ref = db.collection('player')



@app.route('/adduser', methods=['GET'])
@cross_origin()
def addUser():

    try:
        username = request.args.get('username')
        password = request.args.get('password')
        dict_user = {"username":username, "password":password}
        print("dict_user",dict_user)
        db.collection(username).document("userinfo").set(dict_user)
        
        list_cards = [doc.to_dict() for doc in db.collection(username).stream()]
        
        return jsonify(list_cards), 200
    except Exception as e:
        return f"An Error Occurred: {e}"



@app.route('/login', methods=['GET'])
@cross_origin()
def login():

    try:
        username = request.args.get('username')
        password = request.args.get('password')
        dict_user = {"username":username, "password":password}
        print("dict_user",dict_user)
        rc = db.collection(username).document("userinfo").get().to_dict()
        print("rc",rc)
        
        if not rc or rc["username"] != username or rc["password"] != password:
            return jsonify({"status": "error"}), 403
        
        rc["status"] = "ok"
        return jsonify(rc), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/init', methods=['GET'])
@cross_origin()
def init():
    """
        init() : create cards and get 5 random cards
    """
    try:
       
        username = request.args.get('username')
        
        list_userdata = [doc.to_dict() for doc in db.collection(username).stream()]
        
        #print("--list_userdata---------",list_userdata)
        
        #print("--delete cards----------------------------------------------------")
        
        doc_cardref = db.collection(username).document("cards")

        doc = doc_cardref.get()
        if doc.exists:
            #print(f'Document data cards to delete: {doc.to_dict()}')
            db.collection(username).document("cards").delete()
        #else:
        #    print(u'No such document cards!')

        
        for col in doc_cardref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                doc.delete()

        #add cards
        with open("cards.json", "r") as f:
            file_contents = json.load(f)
        #print("file_contents", file_contents)
        #cards_ref.document("cards").set(file_contents)
        #print("--add cards----------------------------------------------------")
        db.collection(username).document("cards").set({})
        #print("--add cards----------------------------------------------------")
        for c in file_contents:
            id = c["id"]
            #print("c",c)
            db.collection(username).document("cards").collection(str(id)).document(str(id)).set(c)
                 
        #print("--delete player----------------------------------------------------")
        #print("--delete cards----------------------------------------------------")
        
        doc_playerref = db.collection(username).document("player")

        doc = doc_playerref.get()
        if doc.exists:
            #print(f'Document data player to delete: {doc.to_dict()}')
            db.collection(username).document("player").delete()
        #else:
        #   print(u'No such document player!')

        
        for col in doc_playerref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                doc.delete()
        
        
        db.collection(username).document("player").set({})
        
        
        r_list = []
        
        list_cards=[]
        for col in doc_cardref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                list_cards.append(doc.get().to_dict())
        
        #print("list_cards",list_cards)
                
                       
        for i in range(1,6):
            #print("i",i)
            val = random.choice(list_cards)
            while True:
                if val not in r_list:
                    id = str(val["id"])
                    r_list.append(val)
                    db.collection(username).document("player").collection(id).document(id).set(val)
                    db.collection(username).document("cards").collection(id).document(id).delete()
                    break
                else:
                    val = random.choice(list_cards)
        
        #print("----------------------------------------------------")
        #print("r_list", r_list)
        
        return jsonify(r_list), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/drawcard', methods=['GET'])
@cross_origin()
def drawcard():

    try:

        username = request.args.get('username')
        #print("username",username)
        doc_cardref = db.collection(username).document("cards")
        doc_playerref = db.collection(username).document("player")
        list_cards=[]
        for col in doc_cardref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                list_cards.append(doc.get().to_dict())
                
        my_card = random.choice(list_cards)
        id = str(my_card["id"])
        db.collection(username).document("player").collection(id).document(id).set(my_card)
        db.collection(username).document("cards").collection(id).document(id).delete()
        return jsonify(my_card), 200
        
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/drawcards', methods=['GET'])
@cross_origin()
def drawcards():

    try:
        username = request.args.get('username')
        #print("username",username)
        doc_cardref = db.collection(username).document("cards")
        doc_playerref = db.collection(username).document("player")
        list_cards=[]
        for col in doc_cardref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                list_cards.append(doc.get().to_dict())
                
        my_card = random.choice(list_cards)
        id = str(my_card["id"])
        db.collection(username).document("player").collection(id).document(id).set(my_card)
        db.collection(username).document("cards").collection(id).document(id).delete()
        
        list_player=[]
        for col in doc_playerref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                list_player.append(doc.get().to_dict())
        
        return jsonify(list_player), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/listcards', methods=['GET'])
@cross_origin()
def get_listcards():
    try:
        username = request.args.get('username')
        doc_cardref = db.collection(username).document("cards")
        
        list_cards=[]
        for col in doc_cardref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                list_cards.append(doc.get().to_dict())
        
        return jsonify(list_cards), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/listplayercards', methods=['GET'])
@cross_origin()
def get_listplayercards():
    try:
        username = request.args.get('username')
        doc_playerref = db.collection(username).document("player")
        list_player=[]
        for col in doc_playerref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                list_player.append(doc.get().to_dict())
        
        return jsonify(list_player), 200
    except Exception as e:
        return f"An Error Occurred: {e}"



#*****************************************************************************************************
"""
Example:
http://localhost:8080/playcard?id=19


"""


@app.route('/playcard', methods=['GET', 'PUT'])
@cross_origin()
def playcard():

    try:
        username = request.args.get('username')
        card_id = request.args.get('id')
        
        db.collection(username).document("player").collection(str(card_id)).document(str(card_id)).delete()
        
        doc_playerref = db.collection(username).document("player")
        list_player=[]
        for col in doc_playerref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                list_player.append(doc.get().to_dict())
                
        return jsonify(list_player), 200
    except Exception as e:
        return f"An Error Occurred: {e}"
        

@app.route('/play_drawcard', methods=['GET', 'PUT'])
@cross_origin()
def play_drawcard():

    try:
        username = request.args.get('username')
        card_id = request.args.get('id')
        
        doc_cardref = db.collection(username).document("cards")
        doc_playerref = db.collection(username).document("player")
        
        db.collection(username).document("player").collection(str(card_id)).document(str(card_id)).delete()
        
        list_cards=[]
        for col in doc_cardref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                list_cards.append(doc.get().to_dict())
                
        my_card = random.choice(list_cards)
        id = str(my_card["id"])
        db.collection(username).document("player").collection(id).document(id).set(my_card)
        db.collection(username).document("cards").collection(id).document(id).delete()
        
        
        
        doc_playerref = db.collection(username).document("player")
        list_player=[]
        for col in doc_playerref.collections():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            for doc in col.list_documents():
                list_player.append(doc.get().to_dict())
    

        return jsonify(list_player), 200
    except Exception as e:
        return f"An Error Occurred: {e}"
 

@app.route('/deletecard', methods=['GET', 'DELETE'])
@cross_origin()
def deletecard():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        card_id = request.args.get('id')
        username = request.args.get('username')
        
        db.collection(username).document("cards").collection(str(card_id)).document(str(card_id)).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"
        
@app.route('/deleteplayer', methods=['GET', 'DELETE'])
@cross_origin()
def deleteplayer():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        card_id = request.args.get('id')
        username = request.args.get('username')
        
        db.collection(username).document("player").collection(str(card_id)).document(str(card_id)).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)