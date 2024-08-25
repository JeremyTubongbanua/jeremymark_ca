# Qt/Atsign Plant Demo

## Links

- [Source Code GitHub](https://github.com/JeremyTubongbanua/at_demos/tree/trunk/demos/qt_atsign_plant_demo)

- [Atsign LinkedIn Post](https://www.linkedin.com/posts/atsigncompany_cybersecurity-remoteaccess-security-ugcPost-7180945780306841601-PsNL?utm_source=share&utm_medium=member_desktop)

- [Video Demo at CES 2024](https://www.youtube.com/watch?v=2cHUCFewl0I)

## Description

This was a joint demo with the Qt Company. The demo was showcased at Qt's booth at CES 2024 in Las Vegas. I was flown by Atsign to set up the demo at their booth and had the opportunity to present the booth to attendees and executives.

The demo was comprised of two parts:

1. The Qt Application written in Python Qt QML
2. Atsign Plant written in Python using at_python

## Qt Application

The Qt Application ran on a Raspberry Pi that ran a screen. It was a simple UI that could control/monitor the plant using atSign's end-to-end encrypted control plane.

## Atsign Plant

The plant itself was comprised of many physical and software components.

Physically, it was using a 5V DC Water pump motor to pump water from the reservoir to the plant. Sensors like soil moisture and water level sensors were used to measure various metrics of the plant. Other electrical componennts like breadboard, jumper wires, and relays were used.

The special pot was customly designed using Fusion360 and printed in PLA.

As for the software, it was all running on a Raspberry Pi 4 running Raspberry Pi OS. The code was written in Python and used our at_python SDK which is the atProtocol client implementation written in Python. This SDK allowed the Pi to communicate with the Qt application and send end-to-end encrypted messages back and forth. This was how monitoring and control of the plant was done securely.

## CAD

![Qt/Atsign physical CAD](https://i.imgur.com/a0Ktn4c.png)

The above image shows you the final iteration of the plant. The water reservoir sits below the plant pot. Then it is pumped to the plant using the water pump motor.
