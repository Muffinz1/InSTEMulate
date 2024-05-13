from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def landing_page():
    return render_template('index.html')

@app.route('/start')
def start_page():
    return render_template('start.html')

@app.route('/game')
def game_page():
    return render_template('game.html')

if __name__ == '__main__':
    app.run(debug=True)
