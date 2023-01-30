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
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()
cards_ref = db.collection('cards')
player_ref = db.collection('player')


@app.route('/init', methods=['GET'])
@cross_origin()
def init():
    """
        init() : create cards and get 5 random cards
    """
    try:
       
        #print("--delete cards----------------------------------------------------")
        for doc in cards_ref.list_documents():
            #print(f'Deleting doc card {doc.id} => {doc.get().to_dict()}')
            doc.delete()
        

        #add cards
        with open("cards.json", "r") as f:
            file_contents = json.load(f)
        #print("file_contents", file_contents)
        #cards_ref.document("cards").set(file_contents)
        #print("--add cards----------------------------------------------------")
        for c in file_contents:
            id = c["id"]
            #print("c",c)
            cards_ref.document(str(id)).set(c)
                 
        #print("--delete player----------------------------------------------------")
        for doc in player_ref.list_documents():
            #print(f'Deleting doc palyer {doc.id} => {doc.get().to_dict()}')
            doc.delete()
        
        #print("----------------------------------------------------")
        list_cards = [doc.to_dict() for doc in cards_ref.stream()]
        #print("list_cards", list_cards)
        
        r_list = []
        #print("----------------------------------------------------")
        #print("r_list", r_list)
        
        for i in range(1,6):
            #print("i",i)
            val = random.choice(list_cards)
            while True:
                if val not in r_list:
                    id = str(val["id"])
                    r_list.append(val)
                    player_ref.document(id).set(val)
                    cards_ref.document(id).delete()
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
        list_cards = [doc.to_dict() for doc in cards_ref.stream()]
        my_card = random.choice(list_cards)
        cards_ref.document(str(my_card["id"])).delete()
        player_ref.document(str(my_card["id"])).set(my_card)
        return jsonify(my_card), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/drawcards', methods=['GET'])
@cross_origin()
def drawcards():

    try:
        list_cards = [doc.to_dict() for doc in cards_ref.stream()]
        my_card = random.choice(list_cards)
        cards_ref.document(str(my_card["id"])).delete()
        player_ref.document(str(my_card["id"])).set(my_card)
        list_player = [doc.to_dict() for doc in player_ref.stream()]
        return jsonify(list_player), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/listcards', methods=['GET'])
@cross_origin()
def get_listcards():
    try:
        all_cards = [doc.to_dict() for doc in cards_ref.stream()]
        
        return jsonify(all_cards), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/listplayercards', methods=['GET'])
@cross_origin()
def get_listplayercards():
    try:
        all_cards = [doc.to_dict() for doc in player_ref.stream()]
        
        return jsonify(all_cards), 200
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
        card_id = request.args.get('id')
        player_ref.document(str(card_id)).delete()
        all_cards = [doc.to_dict() for doc in player_ref.stream()]
        return jsonify(all_cards), 200
    except Exception as e:
        return f"An Error Occurred: {e}"
        

@app.route('/play_drawcard', methods=['GET', 'PUT'])
@cross_origin()
def play_drawcard():

    try:
        card_id = request.args.get('id')
        player_ref.document(str(card_id)).delete()
        
        list_cards = [doc.to_dict() for doc in cards_ref.stream()]
        if list_cards:
            my_card = random.choice(list_cards)
            cards_ref.document(str(my_card["id"])).delete()
            player_ref.document(str(my_card["id"])).set(my_card)
        

        all_cards = [doc.to_dict() for doc in player_ref.stream()]
        return jsonify(all_cards), 200
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
        cards_ref.document(str(card_id)).delete()
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
        player_ref.document(str(card_id)).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)