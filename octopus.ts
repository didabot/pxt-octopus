
//% color=#009ede icon="\uf2db"
//% groups='["Servo","Motor","RGB LED"]'
//% advanced=true
//% weight=1
namespace Octopus {
    export enum Servo {
        //% block="S1"
        S1 = 8,        
        //% block="S2"
        S2 = 9,        
        //% block="S3"
        S3 = 10,        
        //% block="S4"
        S4 = 11,        
        //% block="S5"
        S5 = 12,        
        //% block="S6"
        S6 = 13,        
        //% block="S7"
        S7 = 14,        
        //% block="S8"
        S8 = 15        
    }

    export enum Motor {
        //% block="M1"
        M1 = 0,        
        //% block="M2"
        M2 = 2,        
        //% block="M3"
        M3 = 4,        
        //% block="M4"
        M4 = 6,        
    }

    export enum LED {
        //% block="LED1"
        LED1,
        //% block="LED2"
        LED2,
        //% block="LED3"
        LED3,
        //% block="LED4"
        LED4
    }

    /**
     * set servo angle
     * @param degree 0~180 degree of servo; eg: 0, 30, 109
    */
    //% blockId=Octopus_set_servo_angle block="set servo |%servoId| angle(0~180) |%degree| degree"
    //% weight=130
    //% degree.min=0 degree.max=180
    //% degree.shadow="protractorPicker"
    //% group="Servo"
    export function SetServoAngle(servoId: Servo, degree: number = 0): void {
        // 50hz: 20,000 us
        let v_us = (degree * 1800 / 180 + 600); // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000;
        PCA9685_Drive.setPwm(servoId, 0, value);
    }

    /**
	 * start motor
	*/
    //% blockId=Octopus_start_motor block="start motor |%w| speed(-100~+100) |%speed|" blockGap=8
    //% weight=120
    //% speed.min=-100 speed.max=100
    //% group="Motor"
    export function StartMotor(m: Motor, speed: number): void {
        PCA9685_Drive.initPCA9685();
        speed = speed * 40.96; // scaling 100 to 4096 
        if (speed > 4095) {
            speed = 4095;
        }

        if (speed < -4095) {
            speed = -4095;
        }

        if (m > 6 || m < 0)
            return;

        let pp = m;
        let pn = m + 1;

        if (speed >= 0) {
            PCA9685_Drive.setPwm(pp, 0, 0);
            PCA9685_Drive.setPwm(pn, 0, speed);      
        } else {
            PCA9685_Drive.setPwm(pp, 0, -speed);
            PCA9685_Drive.setPwm(pn, 0, 0);       
        }
    }

    /**
	 * stop motor
	*/
    //% blockId=Octopus_stop_motor block="stop motor |%m|" blockGap=8
    //% weight=110
    //% group="Motor"
    export function StopMotor(m: Motor) {
        StartMotor(m, 0);
    }

    /**
	 * stop all motors
	*/
    //% blockId=Octopus_stop_all_motors block="stop all motors" blockGap=8
    //% weight=100
    //% group="Motor"
    export function StopAllMotors() {
        StartMotor(Motor.M1, 0);
        StartMotor(Motor.M2, 0);
        StartMotor(Motor.M3, 0);
        StartMotor(Motor.M4, 0);
    }

    let neoStrip: neopixel.Strip = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB);
    neoStrip.setBrightness(75);

    /**
     * set led color to a predefined color. 
    */
    //% blockId="Octopus_set_led_color" block="set |%led| color |%color|"
    //% weight=90
    //% group="RGB LED"
    export function setLedColor(led: LED, color: Easybit.Colors): void {
        neoStrip.setPixelColor(led, color);
        neoStrip.show();
    }

    /**
     * set all leds color to a predefined color. 
    */
    //% blockId="Octopus_set_all_leds_color" block="set all led colors |%color|"
    //% weight=80
    //% group="RGB LED"
    export function setAllLedColor(color: Easybit.Colors): void {
        neoStrip.setPixelColor(LED.LED1, color);
        neoStrip.setPixelColor(LED.LED2, color);
        neoStrip.setPixelColor(LED.LED3, color);
        neoStrip.setPixelColor(LED.LED4, color);
        neoStrip.show();
    }

    /**
     * set led color to a given rgb value. 
    */
    //% blockId="Octopus_set_led_rgb" block="set %led color data|red %red|green %green|blue %blue"
    //% weight=70
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% group="RGB LED"
    export function setLedRGB(led: LED, red: number, green: number, blue: number): void {
        neoStrip.setPixelColor(led, packRGB(red, green, blue));
        neoStrip.show();
    }

    /**
     * set all leds color to a given rgb value. 
    */
    //% blockId="Octopus_set_all_leds_rgb" block="set all leds color red |%red| green |%green| blue |%blue|"
    //% weight=60
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% group="RGB LED"
    export function setAllLedRGB(red: number, green: number, blue: number): void {
        let rgb = packRGB(red, green, blue);
        neoStrip.setPixelColor(LED.LED1, rgb);
        neoStrip.setPixelColor(LED.LED2, rgb);
        neoStrip.setPixelColor(LED.LED3, rgb);
        neoStrip.setPixelColor(LED.LED4, rgb);
        neoStrip.show();
    }

    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }

    /**
     * turn off all LEDs. 
    */
    //% blockId="Octopus_clear_all_leds" block="clear all leds"
    //% weight=50
    //% group="RGB LED"
    export function clearAllLeds(): void {
        neoStrip.clear();
        neoStrip.show();
    }

    /**
     * set brightness. 
     * @param level brightness level 0-100
    */
    //% blockId="Octopus_set_led_brightness" block="set led brightness(0~100)|%level|"
    //% weight=50
    //% level.min=0 level.max=100
    //% group="RGB LED"
    export function setLedsBrightness(level : number): void {
        neoStrip.setBrightness(pins.map(level, 0, 100, 0, 255));
        neoStrip.show();
    }
}
