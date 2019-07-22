/*
Copyright (C): 2010-2019, Shenzhen Yahboom Tech
modified from liusen
load dependency
"ledbit": "file:../pxt-ledbit"
*/

//% color="#E21918" weight=20 icon="\uf140"
namespace LEDBit {

    // HT16K33 commands
    const HT16K33_ADDRESS = 0x70
    const HT16K33_BLINK_CMD = 0x80
    const HT16K33_BLINK_DISPLAYON = 0x01
    const HT16K33_BLINK_OFF = 0
    const HT16K33_BLINK_2HZ = 1
    const HT16K33_BLINK_1HZ = 2
    const HT16K33_BLINK_HALFHZ = 3
    const HT16K33_CMD_BRIGHTNESS = 0xE0

    let matBuf = pins.createBuffer(17);
    let initMatrix = false

    export enum enState {
        //% blockId="OFF" block="OFF"
        OFF = 0,
        //% blockId="ON" block="ON"
        ON = 1
    }

    export enum enExpression {
        //% blockId="FACE1" block="Smile"
        FACE1 = 0,
        //% blockId="FACE2" block="Grin"
        FACE2,
        //% blockId="FACE3" block="Sad"
        FACE3,
        //% blockId="FACE4" block="Cry"
        FACE4,
        //% blockId="FACE5" block="Surprise"
        FACE5,
        //% blockId="FACE6" block="Tongue"
        FACE6,
        //% blockId="FACE7" block="Pout"
        FACE7,
        //% blockId="FACE8" block="Standing"
        FACE8,
    }

    let smile = pins.createBuffer(17);
    let grin = pins.createBuffer(17);
    let sad = pins.createBuffer(17);
    let cry = pins.createBuffer(17);
    let Surprise = pins.createBuffer(17);
    let Tongue = pins.createBuffer(17);
    let Pout = pins.createBuffer(17);
    let Standing = pins.createBuffer(17);

    const smile1: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x10, 0x8, 0x18, 0x18, 0xf, 0xf0, 0x3, 0xc0];
    const grin1: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x3f, 0xfc, 0x15, 0xa8, 0xf, 0xf0, 0x3, 0xc0];
    const sad1: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x3, 0xc0, 0xf, 0xf0, 0x18, 0x18, 0x30, 0xc, 0x20, 0x4];
    const cry1: number[] = [0x0, 0xc, 0x18, 0xc, 0x18, 0x8, 0x8, 0x0, 0x0, 0x0, 0x0, 0x1, 0xc0, 0x2, 0x20, 0x4, 0x10];
    const Surprise1: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x7, 0xe0, 0x4, 0x20, 0x2, 0x40, 0x1, 0x80];
    const Tongue1: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x10, 0x8, 0xf, 0xf0, 0xe, 0x0, 0x4, 0x0, 0x0, 0x0];
    const Pout1: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1f, 0xf8, 0x8, 0x10, 0x4, 0x20, 0x3, 0xc0];
    const Standing1: number[] = [0x00, 0xC0, 0x03, 0x40, 0x02, 0x40, 0x02, 0xC0, 0x03, 0xA0, 0x05, 0xA0, 0x05, 0x40, 0x02, 0x40, 0x02];


    export enum dynamicExpression {
        //% blockId="dynamic_FACE1" block="Open_mouth"
        dynamic_FACE1 = 0,
        //% blockId="dynamic_FACE2" block="Naughty"
        dynamic_FACE2,
        //% blockId="dynamic_FACE3" block="Crying"
        dynamic_FACE3,
        //% blockId="dynamic_FACE4" block="GoGoing"
        dynamic_FACE4,
    }

    let Open_mouth0 = pins.createBuffer(17);
    let Open_mouth1 = pins.createBuffer(17);

    const Open_mouth01: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x3, 0xc0, 0x4, 0x20, 0x8, 0x10, 0x4, 0x20, 0x3, 0xc0];
    const Open_mouth11: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x7, 0xe0, 0xf, 0xf0, 0x7, 0xe0, 0x0, 0x0];

    let Naughty0 = pins.createBuffer(17);
    let Naughty1 = pins.createBuffer(17);

    const Naughty01: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0xf, 0xf0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
    const Naughty11: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0xf, 0xf0, 0x3, 0xc0, 0x1, 0x80, 0x1, 0x80];

    let Crying0 = pins.createBuffer(17);
    let Crying1 = pins.createBuffer(17);
    let Crying2 = pins.createBuffer(17);
    let Crying3 = pins.createBuffer(17);
    let Crying4 = pins.createBuffer(17);

    const Crying01: number[] = [0x0, 0x18, 0x18, 0x18, 0x18, 0x10, 0x8, 0x0, 0x0, 0x0, 0x0, 0x3, 0xc0, 0x4, 0x20, 0x8, 0x10];
    const Crying11: number[] = [0x0, 0x18, 0x18, 0x18, 0x18, 0x10, 0x8, 0x10, 0x8, 0x0, 0x0, 0x3, 0xc0, 0x4, 0x20, 0x8, 0x10];
    const Crying21: number[] = [0x0, 0x18, 0x18, 0x18, 0x18, 0x10, 0x8, 0x10, 0x8, 0x0, 0x0, 0x0, 0x0, 0x7, 0xe0, 0x8, 0x10];
    const Crying31: number[] = [0x0, 0x18, 0x18, 0x18, 0x18, 0x10, 0x8, 0x0, 0x0, 0x10, 0x8, 0x0, 0x0, 0x7, 0xe0, 0x8, 0x10];
    const Crying41: number[] = [0x0, 0x18, 0x18, 0x18, 0x18, 0x10, 0x8, 0x0, 0x0, 0x0, 0x0, 0x10, 0x8, 0x0, 0x0, 0xf, 0xf0];

    let Gogoing0 = pins.createBuffer(17);
    let Gogoing1 = pins.createBuffer(17);
    let Gogoing2 = pins.createBuffer(17);
    let Gogoing3 = pins.createBuffer(17);
    let Gogoing4 = pins.createBuffer(17);

    const Gogoing0A: number[] = [0x00, 0x00, 0x3C, 0x00, 0x24, 0x00, 0x24, 0x00, 0x3C, 0x00, 0x5A, 0x00, 0x99, 0x00, 0x24, 0x00, 0x42];
    const Gogoing1A: number[] = [0x00, 0x00, 0x0F, 0x00, 0x09, 0x00, 0x09, 0x00, 0x0F, 0x80, 0x16, 0x40, 0x26, 0x00, 0x09, 0x80, 0x10];
    const Gogoing2A: number[] = [0x00, 0xC0, 0x03, 0x40, 0x02, 0x40, 0x02, 0xC0, 0x03, 0xA0, 0x05, 0x90, 0x09, 0x40, 0x02, 0x20, 0x04];
    const Gogoing3A: number[] = [0x00, 0xF0, 0x00, 0x90, 0x00, 0x90, 0x00, 0xF0, 0x00, 0x68, 0x01, 0x64, 0x02, 0x90, 0x00, 0x08, 0x01];
    const Gogoing4A: number[] = [0x00, 0x3C, 0x00, 0x24, 0x00, 0x24, 0x00, 0x3C, 0x00, 0x5A, 0x00, 0x99, 0x00, 0x24, 0x00, 0x42, 0x00];


    export enum pictureExpression {
        //% blockId="picture_FACE1" block="Big_heart"
        picture_FACE1 = 0,
        //% blockId="picture_FACE2" block="Boat"
        picture_FACE2,
        //% blockId="picture_FACE3" block="Small_heart"
        picture_FACE3,
        //% blockId="picture_FACE4" block="Glass"
        picture_FACE4,
        //% blockId="picture_FACE5" block="Teapot"
        picture_FACE5,
        //% blockId="picture_FACE6" block="House"
        picture_FACE6,
    }

    let Big_heart = pins.createBuffer(17);
    let Boat = pins.createBuffer(17);
    let Small_heart = pins.createBuffer(17);
    let Glass = pins.createBuffer(17);
    let Teapot = pins.createBuffer(17);
    let House = pins.createBuffer(17);

    const Big_heart1: number[] = [0x0, 0xc, 0x60, 0x1e, 0xf0, 0x1f, 0xf0, 0x1f, 0xf0, 0xf, 0xe0, 0x7, 0xc0, 0x3, 0x80, 0x1, 0x0];
    const Boat1: number[] = [0x0, 0x8, 0x0, 0xc, 0x0, 0xe, 0x0, 0x8, 0x0, 0x8, 0x0, 0x1f, 0xf8, 0xf, 0xf0, 0x7, 0xe0];
    const Small_heart1: number[] = [0x0, 0x0, 0x0, 0x6, 0xc0, 0xf, 0xe0, 0xf, 0xe0, 0x7, 0xc0, 0x3, 0x80, 0x1, 0x0, 0x0, 0x0];
    const Glass1: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0xf, 0xe0, 0x4, 0x38, 0x4, 0x24, 0x4, 0x24, 0x4, 0x38, 0x7, 0xe0];
    const Teapot1: number[] = [0x0, 0x1, 0x0, 0x3, 0x80, 0x37, 0xc0, 0x48, 0x2c, 0x48, 0x38, 0x48, 0x30, 0x34, 0x60, 0x3, 0x80];
    const House1: number[] = [0x0, 0x1, 0x0, 0x2, 0x80, 0x4, 0x40, 0xf, 0xe0, 0x4, 0x40, 0x4, 0x40, 0x4, 0x40, 0x7, 0xc0];


    export enum numExpression {
        //% blockId="num_FACE1" block="num1"
        num_FACE1 = 0,
        //% blockId="num_FACE2" block="num2"
        num_FACE2,
        //% blockId="num_FACE3" block="num3"
        num_FACE3,
        //% blockId="num_FACE4" block="num4"
        num_FACE4,
        //% blockId="num_FACE5" block="num5"
        num_FACE5,
        //% blockId="num_FACE6" block="num6"
        num_FACE6,
        //% blockId="num_FACE7" block="num7"
        num_FACE7,
        //% blockId="num_FACE8" block="num8"
        num_FACE8,
        //% blockId="num_FACE9" block="num9"
        num_FACE9,
    }

    let num1 = pins.createBuffer(17);
    let num2 = pins.createBuffer(17);
    let num3 = pins.createBuffer(17);
    let num4 = pins.createBuffer(17);
    let num5 = pins.createBuffer(17);
    let num6 = pins.createBuffer(17);
    let num7 = pins.createBuffer(17);
    let num8 = pins.createBuffer(17);
    let num9 = pins.createBuffer(17);


    const num11: number[] = [0x0, 0x1, 0x0, 0x1, 0x80, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x7, 0xc0];
    const num21: number[] = [0x0, 0x1, 0xc0, 0x2, 0x20, 0x2, 0x0, 0x1, 0x0, 0x0, 0x80, 0x0, 0x40, 0x0, 0x20, 0x3, 0xf0];
    const num31: number[] = [0x0, 0x1, 0xc0, 0x2, 0x20, 0x2, 0x0, 0x1, 0x80, 0x2, 0x0, 0x2, 0x0, 0x2, 0x20, 0x1, 0xc0];
    const num41: number[] = [0x0, 0x0, 0x0, 0x1, 0x40, 0x1, 0x20, 0x1, 0x10, 0x7, 0xf8, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0];
    const num51: number[] = [0x0, 0x7, 0xc0, 0x0, 0x40, 0x3, 0xc0, 0x4, 0x0, 0x4, 0x0, 0x4, 0x0, 0x4, 0x40, 0x3, 0x80];
    const num61: number[] = [0x0, 0x3, 0x80, 0x0, 0x40, 0x0, 0x20, 0x3, 0xe0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x3, 0xc0];
    const num71: number[] = [0x0, 0x7, 0xe0, 0x4, 0x0, 0x2, 0x0, 0x1, 0x0, 0x0, 0x80, 0x0, 0x40, 0x0, 0x20, 0x0, 0x0];
    const num81: number[] = [0x0, 0x7, 0x80, 0x8, 0x40, 0x8, 0x40, 0x7, 0x80, 0x8, 0x40, 0x8, 0x40, 0x8, 0x40, 0x7, 0x80];
    const num91: number[] = [0x0, 0x7, 0x80, 0x8, 0x40, 0x8, 0x40, 0x8, 0x40, 0xf, 0x80, 0x8, 0x0, 0x8, 0x40, 0x7, 0x80];


    export enum characterExpression {
        //% blockId="character_FACE1" block="char_A"
        character_FACE1 = 0,
        //% blockId="character_FACE2" block="char_B"
        character_FACE2,
        //% blockId="character_FACE3" block="char_C"
        character_FACE3,
        //% blockId="character_FACE4" block="char_D"
        character_FACE4,
        //% blockId="character_FACE5" block="char_E"
        character_FACE5,

        //% blockId="character_FACE7" block="char_G"
        character_FACE7,
        //% blockId="character_FACE8" block="char_H"
        character_FACE8,
    }

    let A_show = pins.createBuffer(17);
    let B_show = pins.createBuffer(17);
    let C_show = pins.createBuffer(17);
    let D_show = pins.createBuffer(17);
    let E_show = pins.createBuffer(17);

    let G_show = pins.createBuffer(17);
    let H_show = pins.createBuffer(17);

    const A1_show: number[] = [0x0, 0x1, 0x0, 0x2, 0x80, 0x4, 0x40, 0x8, 0x20, 0x1f, 0xf0, 0x20, 0x8, 0x40, 0x4, 0x0, 0x0];
    const B1_show: number[] = [0x0, 0x1, 0xe0, 0x2, 0x20, 0x2, 0x20, 0x1, 0xe0, 0x2, 0x20, 0x2, 0x20, 0x2, 0x20, 0x1, 0xe0];
    const C1_show: number[] = [0x0, 0x1, 0xe0, 0x2, 0x10, 0x0, 0x10, 0x0, 0x10, 0x0, 0x10, 0x0, 0x10, 0x2, 0x10, 0x1, 0xe0];
    const D1_show: number[] = [0x0, 0x1, 0xf0, 0x2, 0x10, 0x4, 0x10, 0x4, 0x10, 0x4, 0x10, 0x4, 0x10, 0x2, 0x10, 0x1, 0xe0];
    const E1_show: number[] = [0x0, 0x1, 0xf0, 0x0, 0x10, 0x0, 0x10, 0x1, 0xf0, 0x0, 0x10, 0x0, 0x10, 0x0, 0x10, 0x1, 0xf0];
 
    const G1_show: number[] = [0x0, 0x1, 0xe0, 0x2, 0x10, 0x0, 0x10, 0x0, 0x10, 0x3, 0x90, 0x2, 0x10, 0x3, 0xe0, 0x2, 0x0];
    const H1_show: number[] = [0x0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x7, 0xe0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20];


    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function matrixInit() {
        i2ccmd(HT16K33_ADDRESS, 0x21);// turn on oscillator
        i2ccmd(HT16K33_ADDRESS, HT16K33_BLINK_CMD | HT16K33_BLINK_DISPLAYON | (0 << 1));
        i2ccmd(HT16K33_ADDRESS, HT16K33_CMD_BRIGHTNESS | 0xF);
    }

    function matrixShow() {
        matBuf[0] = 0x00;
        pins.i2cWriteBuffer(HT16K33_ADDRESS, matBuf);
    }


    //% blockId=ledbit_led_show block="LED expression Show|%index"
    //% weight=99
    export function LEDShow(index: enExpression): void {
        if (!initMatrix) {
            matrixInit();
            initMatrix = true;
        }
        switch (index) {
            case enExpression.FACE1: {
                smile[0] = smile1[0];
                for (let i = 1; i < 17; i += 2) {
                    smile[i] = smile1[i + 1];
                    smile[i + 1] = smile1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, smile);
                break;
            }
            case enExpression.FACE2: {
                //statements; 
                grin[0] = grin1[0];
                for (let i = 1; i < 17; i += 2) {
                    grin[i] = grin1[i + 1];
                    grin[i + 1] = grin1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, grin);
                break;
            }
            case enExpression.FACE3: {
                sad[0] = sad1[0];
                for (let i = 1; i < 17; i += 2) {
                    sad[i] = sad1[i + 1];
                    sad[i + 1] = sad1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, sad);
                break;
            }
            case enExpression.FACE4: {
                cry[0] = cry1[0];
                for (let i = 1; i < 17; i += 2) {
                    cry[i] = cry1[i + 1];
                    cry[i + 1] = cry1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, cry);
                break;
            }
            case enExpression.FACE5: {
                Surprise[0] = Surprise1[0];
                for (let i = 1; i < 17; i += 2) {
                    Surprise[i] = Surprise1[i + 1];
                    Surprise[i + 1] = Surprise1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Surprise);
                break;
            }
            case enExpression.FACE6: {
                Tongue[0] = Tongue1[0];
                for (let i = 1; i < 17; i += 2) {
                    Tongue[i] = Tongue1[i + 1];
                    Tongue[i + 1] = Tongue1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Tongue);
                break;
            }
            case enExpression.FACE7: {
                Pout[0] = Pout1[0];
                for (let i = 1; i < 17; i += 2) {
                    Pout[i] = Pout1[i + 1];
                    Pout[i + 1] = Pout1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Pout);
                break;
            }
            case enExpression.FACE8: {
                for (let i = 0; i < 17; i++) {
                    Standing[i] = Standing1[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, Standing);
            }
            default: {
                //statements; 
                break;
            }
        }
    }

    //% blockId=ledbit_led_dynamic block="LED dynamicexpression Show|%index_1"
    //% weight=98
    export function LEDdynamic(index_1: dynamicExpression): void {
        if (!initMatrix) {
            matrixInit();
            initMatrix = true;
        }
        switch (index_1) {
            case dynamicExpression.dynamic_FACE1: {
                Open_mouth0[0] = Open_mouth01[0];
                for (let i = 1; i < 17; i += 2) {
                    Open_mouth0[i] = Open_mouth01[i + 1];
                    Open_mouth0[i + 1] = Open_mouth01[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Open_mouth0);
                //control.waitMicros(7000);
                basic.pause(1000);

                Open_mouth1[0] = Open_mouth11[0];
                for (let i = 1; i < 17; i += 2) {
                    Open_mouth1[i] = Open_mouth11[i + 1];
                    Open_mouth1[i + 1] = Open_mouth11[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Open_mouth1);
                //control.waitMicros(7000);
                basic.pause(1000);

                break;
            }
            case dynamicExpression.dynamic_FACE2: {
                //statements; 
                Naughty0[0] = Naughty01[0];
                for (let i = 1; i < 17; i += 2) {
                    Naughty0[i] = Naughty01[i + 1];
                    Naughty0[i + 1] = Naughty01[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Naughty0);
                basic.pause(600);

                Naughty1[0] = Naughty11[0];
                for (let i = 1; i < 17; i += 2) {
                    Naughty1[i] = Naughty11[i + 1];
                    Naughty1[i + 1] = Naughty11[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Naughty1);
                basic.pause(600);

                break;
            }
            case dynamicExpression.dynamic_FACE3: {
                //statements; 
                Crying0[0] = Crying01[0];
                for (let i = 1; i < 17; i += 2) {
                    Crying0[i] = Crying01[i + 1];
                    Crying0[i + 1] = Crying01[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Crying0);
                basic.pause(600);

                Crying1[0] = Crying11[0];
                for (let i = 1; i < 17; i += 2) {
                    Crying1[i] = Crying11[i + 1];
                    Crying1[i + 1] = Crying11[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Crying1);
                basic.pause(600);

                Crying2[0] = Crying21[0];
                for (let i = 1; i < 17; i += 2) {
                    Crying2[i] = Crying21[i + 1];
                    Crying2[i + 1] = Crying21[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Crying2);
                basic.pause(600);

                Crying3[0] = Crying31[0];
                for (let i = 1; i < 17; i += 2) {
                    Crying3[i] = Crying31[i + 1];
                    Crying3[i + 1] = Crying31[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Crying3);
                basic.pause(600);

                Crying4[0] = Crying41[0];
                for (let i = 1; i < 17; i += 2) {
                    Crying4[i] = Crying41[i + 1];
                    Crying4[i + 1] = Crying41[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Crying4);
                basic.pause(600);
                break;
            }
            case dynamicExpression.dynamic_FACE4: {
                //statements; 
                LEDClear();
                for (let i = 0; i < 17; i++) {
                    Gogoing0[i] = Gogoing0A[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, Gogoing0);
                basic.pause(600);

                for (let i = 0; i < 17; i++) {
                    Gogoing1[i] = Gogoing1A[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, Gogoing1);
                basic.pause(600);

                for (let i = 0; i < 17; i++) {
                    Gogoing2[i] = Gogoing2A[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, Gogoing2);
                basic.pause(600);

                for (let i = 0; i < 17; i++) {
                    Gogoing3[i] = Gogoing3A[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, Gogoing3);
                basic.pause(600);

                for (let i = 0; i < 17; i++) {
                    Gogoing4[i] = Gogoing4A[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, Gogoing4);
                basic.pause(600);

                break;
            }
            default: {
                //statements; 
                break;
            }
        }
    }

    //% blockId=ledbit_led_character block="LED character Show|%index_2"
    //% weight=97
    export function LEDcharacter(index_2: characterExpression): void {
        if (!initMatrix) {
            matrixInit();
            initMatrix = true;
        }
        switch (index_2) {
            case characterExpression.character_FACE1: {
                A_show[0] = A1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    A_show[i] = A1_show[i + 1];
                    A_show[i + 1] = A1_show[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, A_show);
                break;
            }
            case characterExpression.character_FACE2: {
                B_show[0] = B1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    B_show[i] = B1_show[i + 1];
                    B_show[i + 1] = B1_show[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, B_show);
                break;
            }
            case characterExpression.character_FACE3: {
                C_show[0] = C1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    C_show[i] = C1_show[i + 1];
                    C_show[i + 1] = C1_show[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, C_show);
                break;
            }
            case characterExpression.character_FACE4: {

                D_show[0] = D1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    D_show[i] = D1_show[i + 1];
                    D_show[i + 1] = D1_show[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, D_show);
                break;
            }
            case characterExpression.character_FACE5: {
                E_show[0] = E1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    E_show[i] = E1_show[i + 1];
                    E_show[i + 1] = E1_show[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, E_show);
                break;
            }
            case characterExpression.character_FACE7: {
                G_show[0] = G1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    G_show[i] = G1_show[i + 1];
                    G_show[i + 1] = G1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, G_show);
                break;
            }   
            case characterExpression.character_FACE8: {
                H_show[0] = H1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    H_show[i] = H1_show[i + 1];
                    H_show[i + 1] = H1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, H_show);
                break;
            }
                           
            default: {
                //statements; 
                break;
            }
        }
    }

    //% blockId=ledbit_led_num block="LED num Show|%index_3"
    //% weight=96
    export function LEDnum(index_3: numExpression): void {
        if (!initMatrix) {
            matrixInit();
            initMatrix = true;
        }
        switch (index_3) {
            case numExpression.num_FACE1: {
                num1[0] = num11[0];
                for (let i = 1; i < 17; i += 2) {
                    num1[i] = num11[i + 1];
                    num1[i + 1] = num11[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, num1);
                break;
            }
            case numExpression.num_FACE2: {
                //statements; 
                num2[0] = num21[0];
                for (let i = 1; i < 17; i += 2) {
                    num2[i] = num21[i + 1];
                    num2[i + 1] = num21[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, num2);
                break;
            }
            case numExpression.num_FACE3: {
                //statements; 
                num3[0] = num31[0];
                for (let i = 1; i < 17; i += 2) {
                    num3[i] = num31[i + 1];
                    num3[i + 1] = num31[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, num3);
                break;
            }
            case numExpression.num_FACE4: {
                //statements; 
                num4[0] = num41[0];
                for (let i = 1; i < 17; i += 2) {
                    num4[i] = num41[i + 1];
                    num4[i + 1] = num41[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, num4);
                break;
            }
            case numExpression.num_FACE5: {
                //statements; 
                num5[0] = num51[0];
                for (let i = 1; i < 17; i += 2) {
                    num5[i] = num51[i + 1];
                    num5[i + 1] = num51[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, num5);
                break;
            }
            case numExpression.num_FACE6: {
                //statements; 
                num6[0] = num61[0];
                for (let i = 1; i < 17; i += 2) {
                    num6[i] = num61[i + 1];
                    num6[i + 1] = num61[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, num6);
                break;
            }
            case numExpression.num_FACE7: {
                //statements; 
                num7[0] = num71[0];
                for (let i = 1; i < 17; i += 2) {
                    num7[i] = num71[i + 1];
                    num7[i + 1] = num71[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, num7);
                break;
            }
            case numExpression.num_FACE8: {
                //statements; 
                num8[0] = num81[0];
                for (let i = 1; i < 17; i += 2) {
                    num8[i] = num81[i + 1];
                    num8[i + 1] = num81[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, num8);
                break;
            }
            case numExpression.num_FACE9: {
                //statements; 
                num9[0] = num91[0];
                for (let i = 1; i < 17; i += 2) {
                    num9[i] = num91[i + 1];
                    num9[i + 1] = num91[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, num9);
                break;
            }
            default: {
                //statements; 
                break;
            }
        }
    }

    //% blockId=ledbit_led_picture block="LED picture Show|%index_4"
    //% weight=95
    export function LEDpicture(index_4: pictureExpression): void {
        if (!initMatrix) {
            matrixInit();
            initMatrix = true;
        }
        switch (index_4) {
            case pictureExpression.picture_FACE1: {
                Big_heart[0] = Big_heart1[0];
                for (let i = 1; i < 17; i += 2) {
                    Big_heart[i] = Big_heart1[i + 1];
                    Big_heart[i + 1] = Big_heart1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Big_heart);
                break;
            }
            case pictureExpression.picture_FACE2: {
                //statements; 
                Boat[0] = Boat1[0];
                for (let i = 1; i < 17; i += 2) {
                    Boat[i] = Boat1[i + 1];
                    Boat[i + 1] = Boat1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Boat);
                break;
            }
            case pictureExpression.picture_FACE3: {
                Small_heart[0] = Small_heart1[0];
                for (let i = 1; i < 17; i += 2) {
                    Small_heart[i] = Small_heart1[i + 1];
                    Small_heart[i + 1] = Small_heart1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Small_heart);
                break;
            }
            case pictureExpression.picture_FACE4: {
                Glass[0] = Glass1[0];
                for (let i = 1; i < 17; i += 2) {
                    Glass[i] = Glass1[i + 1];
                    Glass[i + 1] = Glass1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Glass);
                break;
            }
            case pictureExpression.picture_FACE5: {
                Teapot[0] = Teapot1[0];
                for (let i = 1; i < 17; i += 2) {
                    Teapot[i] = Teapot1[i + 1];
                    Teapot[i + 1] = Teapot1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, Teapot);
                break;
            }
            case pictureExpression.picture_FACE6: {
                House[0] = House1[0];
                for (let i = 1; i < 17; i += 2) {
                    House[i] = House1[i + 1];
                    House[i + 1] = House1[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, House);
                break;
            }
            default: {
                //statements; 
                break;
            }
        }
    }

    //% blockId=ledbit_led_draw block="LED expression Draw|X %x|Y %y| %on"
    //% x.min=1 x.max=15 y.min=0 y.max=7
    //% weight=94
    export function LEDDraw(x: number, y: number, on: enState): void {
        if (!initMatrix) {
            matrixInit();
            initMatrix = true;
        }
        let idx = y * 2 + x / 8;
        let tmp = matBuf[idx + 1];
        if (on == enState.ON)
            tmp |= (1 << (x % 8));
        else
            tmp &= ~(1 << (x % 8));
        matBuf[idx + 1] = tmp;
        matrixShow();
    }

    //% blockId=ledbit_led_clear block="LED expression Clear"
    //% weight=93
    export function LEDClear(): void {
        if (!initMatrix) {
            matrixInit();
            initMatrix = true;
        }
        for (let i = 0; i < 16; i++) {
            matBuf[i + 1] = 0;
        }
        matrixShow();
    }

    //% blockId=ledbit_led_AllOn block="Matrix All On"
    //% weight=92
    //% blockGap=50
    export function LEDAllOn(): void {
        if (!initMatrix) {
            matrixInit();
            initMatrix = true;
        }
        for (let i = 0; i < 16; i++) {
            matBuf[i + 1] = 0xff;
        }
        matrixShow();
    }
}
