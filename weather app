# weather-app
import sys
import requests
from PySide6.QtCore import Qt
from PySide6.QtWidgets import (
    QApplication, QWidget, QLabel,
    QLineEdit, QPushButton, QVBoxLayout
)

class WeatherApp(QWidget):
    def  __init__(self):
        super().__init__()
        self.city_label=QLabel("Enter city name:", self)
        self.city_input=QLineEdit(self)
        self.get_weather_button=QPushButton("Get Weather", self)
        self.temperature_label=QLabel(self)
        self.emoji_label=QLabel(self)
        self.description_label=QLabel(self)
        self.day_night_label = QLabel(self)
        # Mobile 9:16 base size
        self.base_width = 360
        self.base_height = 640

        self.setMinimumSize(360, 640)
        self.setMaximumSize(420, 746)

        self.initUI()
    def resizeEvent(self, event):
        w = event.size().width()
        h = int(w * 16 / 9)

        if event.size().height() != h:
            self.resize(w, h)

        super().resizeEvent(event)


    def initUI(self):
        self.setWindowTitle("Weather App")

        vbox=QVBoxLayout()

        vbox.addWidget(self.city_label)
        vbox.addWidget(self.city_input)
        vbox.addWidget(self.get_weather_button)
        vbox.addWidget(self.temperature_label)
        vbox.addWidget(self.emoji_label)
        vbox.addWidget(self.description_label)
        vbox.addWidget(self.day_night_label)

        self.setLayout(vbox)

        self.city_label.setAlignment(Qt.AlignCenter)
        self.city_input.setAlignment(Qt.AlignCenter)
        self.temperature_label.setAlignment(Qt.AlignCenter)
        self.emoji_label.setAlignment(Qt.AlignCenter)
        self.description_label.setAlignment(Qt.AlignCenter)
        self.day_night_label.setAlignment(Qt.AlignCenter)
        
        
        self.day_night_label.setObjectName("day_night_label")
        self.city_label.setObjectName("city_label")
        self.city_input.setObjectName("city_input")
        self.get_weather_button.setObjectName("get_weather_button")
        self.temperature_label.setObjectName("temperature_label")
        self.emoji_label.setObjectName("emoji_label")
        self.description_label.setObjectName("description_label")

        self.temperature_label.setTextFormat(Qt.RichText)
        self.emoji_label.setTextFormat(Qt.RichText)
        self.description_label.setTextFormat(Qt.RichText)
        self.day_night_label.setTextFormat(Qt.RichText)


        self.setStyleSheet("""
    QWidget {
        background-color: #0f172a;
        font-family: Segoe UI;
    }

    QLabel {
        color: #e5e7eb;
    }

    QLabel#city_label {
        font-size: 24px;
        font-weight: 600;
        padding-bottom: 6px;
    }

    QLineEdit#city_input {
        font-size: 20px;
        padding: 12px;
        border-radius: 12px;
        background-color: #020617;
        color: white;
        border: 1px solid #334155;
    }

    QLineEdit#city_input:focus {
        border: 2px solid #38bdf8;
    }

    QPushButton#get_weather_button {
        background-color: #38bdf8;
        color: #020617;
        font-size: 20px;
        font-weight: bold;
        padding: 12px;
        border-radius: 14px;
    }

    QPushButton#get_weather_button:hover {
        background-color: #0ea5e9;
    }

    QFrame#card {
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 20px;
        border: 1px solid rgba(255,255,255,0.08);
    }

    QLabel#temperature_label {
        font-size: 64px;
        font-weight: bold;
        color: #38bdf8;
    }

    QLabel#emoji_label {
        font-size: 90px;
        font-family: Segoe UI Emoji;
    }

    QLabel#description_label {
        font-size: 28px;
        font-weight: 600;
        color: #facc15;
    }

    QLabel#day_night_label {
        font-size: 22px;
        color: #c7d2fe;
    }
""")


        self.get_weather_button.clicked.connect(self.get_weather)

    def get_weather(self):

        api_key="6218bc03419e7610b8ee12754c6e1ad8"
        city=self.city_input.text()
        
        url=f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
        

        try:
            response=requests.get(url)
            response.raise_for_status()
            data=response.json()

            if data["cod"]==200:
                self.display_weather(data)
  
        except requests.exceptions.HTTPError as http_error:
            match response.status_code:
                case 400:
                    self.display_error("Please enter city name")
                case 401:
                    self.display_error("Unauthorized\nInvalid API key")
                case 403:
                    self.display_error("Forbidden\nAccess is denied")
                case 404:
                    self.display_error("City not found")
                case 500:
                    self.display_error("Internal server error\nPlease try again later")
                case 502:
                    self.display_error("Bad Gateway\nInvalid response from the server")
                case 503:
                    self.display_error("Service is unavailable\nServer is down")
                case 504:
                    self.display_error("Gateway timeout\nNo response from the server")
                case _:
                    self.display_error(f"http error occurred\n{http_error}")


        except requests.exceptions.ConnectionError:
            self.display_error("Check your internet connection")
        except requests.exceptions.Timeout:
            self.display_error("Request timed out")
        except requests.exceptions.TooManyRedirects:
            self.display_error("Too many redirects")
        except requests.exceptions.RequestException as req_error:
            self.display_error(f"Request error:\n{req_error}")

    def display_error(self, message):
        self.temperature_label.setText(f"""
            <div style="
                text-align:center;
                padding:20px;
                border-radius:20px;
                background:rgba(255,0,0,0.1);
                font-size:26px;
                font-weight:600;
                color:#f87171;">
                ❌ {message}
            </div>
        """)
        self.emoji_label.clear()
        self.description_label.clear()
        self.day_night_label.clear()



    def display_weather(self, data):
        temp = round(data["main"]["temp"])
        desc = data["weather"][0]["description"].title()
        weather_id = data["weather"][0]["id"]

        now = data["dt"]
        sunrise = data["sys"]["sunrise"]
        sunset = data["sys"]["sunset"]
        is_day = sunrise <= now < sunset

        emoji = self.get_weather_emoji(weather_id, is_day)

        # 🌡️ Temperature (Gradient Text)
        self.temperature_label.setText(f"""
            <div style="
            text-align:center;
            font-size:50px;
            font-weight:800;
            color:#38bdf8;">
            {temp-273.15:.1f}&deg;C
        </div>
    """)


        # 🌤️ Emoji
        self.emoji_label.setText(f"""
            <div style="text-align:center; font-size:100px;">
                {emoji}
            </div>
        """)

        # 🏷️ Weather Badge
        self.description_label.setText(f"""
            <div style="text-align:center;">
                <span style="
                    display:inline-block;
                    padding:10px 20px;
                    border-radius:20px;
                    background:rgba(255,255,255,0.1);
                    font-size:26px;
                    font-weight:600;
                    color:#facc15;">
                    {desc}
                </span>
            </div>
        """)

        # 🌞🌙 Day / Night Badge
        self.day_night_label.setText(f"""
            <div style="text-align:center; margin-top:10px;">
                <span style="
                    padding:8px 18px;
                    border-radius:18px;
                    font-size:22px;
                    font-weight:600;
                    color:white;
                    background:{'#0ea5e9' if is_day else '#6366f1'};">
                    {"🌞 Day" if is_day else "🌙 Night"}
                </span>
            </div>
        """)

    def get_weather_emoji(self, weather_id, is_day):
        if 200<=weather_id<=232:
            return "⛈️"
        elif 300<= weather_id<=321:
            return "🌦️"
        elif 500<=weather_id<=531:
            return "🌧️"
        elif 600<=weather_id<=622:
            return "❄️"
        elif 701<=weather_id<=741:
            return "༄"
        elif weather_id==762:
            return "🌋"
        elif weather_id==771:
            return "💨"
        elif weather_id==781:
            return "🌪️"
        elif weather_id==800:
            return "☀️" if is_day else "🌙"
        elif 801<=weather_id<=804:
            return "☁️"
        else:
            return ""

if __name__=="__main__":
    app=QApplication(sys.argv)
    weather_app=WeatherApp()
    weather_app.show()
    sys.exit(app.exec())
