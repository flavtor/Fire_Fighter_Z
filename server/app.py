# app.py

# Import necessary libraries for Flask application
import os
from flask import Flask, request, jsonify  # Import libraries for Flask, HTTP requests and JSON responses
from flask_cors import CORS, cross_origin  # Import library for Cross-Origin Resource Sharing (CORS)
from firebase_admin import credentials, firestore, initialize_app  # Import libraries for Firebase Admin and Firestore
import json  # Import library for handling JSON data
import random  # Import library for generating random numbers

# Initialize Flask application
app = Flask(__name__)
# Enable CORS for the Flask application
cors = CORS(app)
# Set the header for CORS to "Content-Type"
app.config['CORS_HEADERS'] = 'Content-Type'

# Initialize Firestore database
# Load the certificate for accessing Firestore from 'server/key.json'
cred = credentials.Certificate('server/key.json')
# Initialize the Firebase Admin library using the certificate
default_app = initialize_app(cred)
# Connect to the Firestore database using the Firebase Admin library
db = firestore.client()
# Reference the 'cards' collection in the Firestore database
cards_ref = db.collection('cards')
# Reference the 'player' collection in the Firestore database
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


# This function allows a user to draw one card randomly from the available cards.
# The drawn card is then added to the user's player card collection and removed from the available card collection.
# The function returns the drawn card in JSON format.
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
        # Return an error message if an exception occurs
        return f"An Error Occurred: {e}"


# This function retrieves a list of all cards from the "cards" collection of the user, chooses a random card from the list,
# adds it to the "player" collection of the user, deletes it from the "cards" collection of the user,
# and returns the list of all cards in the "player" collection of the user.
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
        # Return an error message if an exception occurs
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