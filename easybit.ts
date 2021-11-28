
namespace Easybit {
    export enum Colors {
        //% block=red
        Red = 0xFF0000,
        //% block=orange
        Orange = 0xFFA500,
        //% block=yellow
        Yellow = 0xFFFF00,
        //% block=green
        Green = 0x00FF00,
        //% block=blue
        Blue = 0x0000FF,
        //% block=indigo
        Indigo = 0x4b0082,
        //% block=violet
        Violet = 0x8a2be2,
        //% block=purple
        Purple = 0xFF00FF,
        //% block=white
        White = 0xFFFFFF,
        //% block=black
        Black = 0x000000
    }

    export enum DigitalPort {
        //% block=P0
        P0,
        //% block=P1
        P1,
        //% block=P2
        P2,
        //% block=P3       
        P3,
        //% block=P4
        P4,
        //% block=P6
        P6,
        //% block=P7
        P7,
        //% block=P8
        P8,
        //% block=P9
        P9,
        //% block=P10
        P10,
        //% block=P12
        P12,
        //% block=P13
        P13
    }

    export enum AnalogPort {
        //% block=P0
        P0,
        //% block=P1
        P1,
        //% block=P2
        P2,
        //% block=P3       
        P3,
        //% block=P4
        P4,
        //% block=P10
        P10
    }

    export enum MultiPort {
        //% block=IIC
        IIC,
        //% block=UART
        UART
    }

    export const serialTxPin: SerialPin = SerialPin.P15;
    export const serialRxPin: SerialPin = SerialPin.P14;

    export function toDigitalPin(port: DigitalPort): DigitalPin {
        let pin: DigitalPin;
        switch (port) {
            case DigitalPort.P0: pin = DigitalPin.P0; break;
            case DigitalPort.P1: pin = DigitalPin.P1; break;
            case DigitalPort.P2: pin = DigitalPin.P2; break;
            case DigitalPort.P3: pin = DigitalPin.P3; break;
            case DigitalPort.P4: pin = DigitalPin.P4; break;
            case DigitalPort.P6: pin = DigitalPin.P6; break;
            case DigitalPort.P7: pin = DigitalPin.P7; break;
            case DigitalPort.P8: pin = DigitalPin.P8; break;
            case DigitalPort.P9: pin = DigitalPin.P9; break;
            case DigitalPort.P10: pin = DigitalPin.P10; break;
            case DigitalPort.P12: pin = DigitalPin.P12; break;
            case DigitalPort.P13: pin = DigitalPin.P13; break;
        }

        return pin;
    }

    export function digitalPortHold(port: DigitalPort) {
        switch (port) {
            case DigitalPort.P3: 
            case DigitalPort.P4: 
            case DigitalPort.P10:
                led.enable(false);
            break;
        }
    }

    export function digitalPortRelease(port: DigitalPort) {

        switch (port) {
            case DigitalPort.P3: 
            case DigitalPort.P4: 
            case DigitalPort.P10:
                led.enable(true);
            break;
        }
    }

    export function toAnalogPin(port: AnalogPort): AnalogPin {
        let pin: AnalogPin;
        switch (port) {
            case AnalogPort.P0: pin = AnalogPin.P0; break;
            case AnalogPort.P1: pin = AnalogPin.P1; break;
            case AnalogPort.P2: pin = AnalogPin.P2; break;
            case AnalogPort.P3: pin = AnalogPin.P3; break;
            case AnalogPort.P4: pin = AnalogPin.P4; break;
            case AnalogPort.P10: pin = AnalogPin.P10; break;
        }

        return pin;
    }

    export function analogPortHold(port: AnalogPort) {
        switch (port) {
            case AnalogPort.P3: 
            case AnalogPort.P4: 
            case AnalogPort.P10:
                led.enable(false);
            break;
        }
    }

    export function analogPortRelease(port: AnalogPort) {
        switch (port) {
            case AnalogPort.P3: 
            case AnalogPort.P4: 
            case AnalogPort.P10:
                led.enable(true);
            break;
        }
    }

    export function toEventSource(port: DigitalPort): EventBusSource {
        let src: EventBusSource;
        switch (port) {
            case DigitalPort.P0: src = EventBusSource.MICROBIT_ID_IO_P0; break;
            case DigitalPort.P1: src = EventBusSource.MICROBIT_ID_IO_P1; break;
            case DigitalPort.P2: src = EventBusSource.MICROBIT_ID_IO_P2; break;
            case DigitalPort.P3: src = EventBusSource.MICROBIT_ID_IO_P3; break;
            case DigitalPort.P4: src = EventBusSource.MICROBIT_ID_IO_P4; break;
            case DigitalPort.P10: src = EventBusSource.MICROBIT_ID_IO_P10; break;
        }

        return src;
    }

    export function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    export function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    export function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1);
        buf[0] = value;
        pins.i2cWriteBuffer(addr, buf);
    }
}
