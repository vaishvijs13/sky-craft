import adafruit_dht
import time
from adafruit_blinka.microcontroller.bcm283x import pin  # For Raspberry Pi GPIO pins

# Define the GPIO pin (replace D4 with your actual GPIO pin)
DHT_PIN = pin.D4

# Initialize the DHT11 sensor on the specified GPIO pin
dht_sensor = adafruit_dht.DHT11(DHT_PIN)

while True:
    try:
        # Get temperature and humidity readings
        temperature = dht_sensor.temperature
        humidity = dht_sensor.humidity
        print(f"Temp: {temperature:.1f}°C   Humidity: {humidity:.1f}%")
    except RuntimeError as error:
        # Handle occasional errors from the sensor
        print(f"Sensor error: {error.args[0]}")
    except Exception as e:
        print(f"Unexpected error: {e}")
        break  # Break the loop if there’s an unexpected error
    time.sleep(2)  # Wait for 2 seconds between readings