from flask import Flask, render_template, request, session, redirect, url_for, jsonify
import random

app = Flask(__name__, static_folder='static')
app.secret_key = 'super_secret_key_very_random_12345'

@app.route('/')
def index():
    # initialize game if not present
    if 'number' not in session:
        session['number'] = random.randint(1, 100)
        session['attempts'] = 0
    return render_template('index.html')

@app.route('/guess', methods=['POST'])
def guess():
    data = request.get_json()
    val = data.get('guess')
    if val is None:
        return jsonify({'status':'error', 'message':'No guess provided'}), 400

    try:
        guess = int(val)
    except:
        return jsonify({'status':'error', 'message':'Enter a valid integer'}), 400

    session['attempts'] = session.get('attempts', 0) + 1
    secret = session.get('number')
    if guess < secret:
        return jsonify({'status':'ok', 'result':'low', 'attempts': session['attempts']})
    elif guess > secret:
        return jsonify({'status':'ok', 'result':'high', 'attempts': session['attempts']})
    else:
        attempts = session['attempts']
        # Keep the number until restart; client can show win and request /restart if needed
        return jsonify({'status':'ok', 'result':'correct', 'attempts': attempts})

@app.route('/restart', methods=['POST'])
def restart():
    session['number'] = random.randint(1, 100)
    session['attempts'] = 0
    return jsonify({'status':'ok'})

if __name__ == '__main__':
    app.run(debug=True)
