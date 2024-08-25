# at_esp32

## Links

- <https://github.com/JeremyTubongbanua/at_esp32>

- [Video tutorial playlist of at_esp32](https://www.youtube.com/playlist?list=PLkZCny-S3rfC93_Xqd_HBkK_dAjDzQ9Et)

## Description

The SDK for the ESP32 microcontroller written in C++ for Arduino. This SDK allows ESP32 Arduino devices to communicate with their atServers with edge encryption.

I had the opportunity to implement various low-level cryptographic functions that the atProtocol required such as :

- RSA 2048 encrypt/decrypt
- AES 256 CTR encrypt/decrypt
- RSA 2048 sign
- RSA 2048 key importing

and Atclient implementations such as:

- AtClient put
- AtClient get
- AtClient delete
- AtClient pkam authentication

## UMass Boston Winter 2022

This SDK was primarily written so that UMass Boston students could use it in their final CS project. Their final project involved creating a simple actuator/sesnor ESP32 demo using the atPlatform.

They needed an app (written in Flutter or Java) that could send commands or read data from an ESP32 (running at_esp32).

I played a strong role in the development of this SDK and the success of the students who used it. I also had to hold things like workshops and office hours to help students understand how to use the SDK. A video playlist tutorial was also created, which can be viewed [here](https://www.youtube.com/playlist?list=PLkZCny-S3rfC93_Xqd_HBkK_dAjDzQ9Et).
