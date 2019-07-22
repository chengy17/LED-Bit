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




    export enum characterExpression {
        //% blockId="character_FACE1" block="A"
        character_FACE1 = 0,
        //% blockId="character_FACE2" block="B"
        character_FACE2,
        //% blockId="character_FACE3" block="C"
        character_FACE3,
        //% blockId="character_FACE4" block="D"
        character_FACE4,
        //% blockId="character_FACE5" block="E"
        character_FACE5,
        //% blockId="character_FACE6" block="F"
        character_FACE6,
        //% blockId="character_FACE7" block="G"
        character_FACE7,
        //% blockId="character_FACE8" block="H"
        character_FACE8,
        //% blockId="character_FACE9" block="I"
        character_FACE9,
        //% blockId="character_FACE10" block="J"
        character_FACE10,
        //% blockId="character_FACE11" block="K"
        character_FACE11,
        //% blockId="character_FACE12" block="L"
        character_FACE12,
        //% blockId="character_FACE13" block="M"
        character_FACE13,
        //% blockId="character_FACE14" block="N"
        character_FACE14,
        //% blockId="character_FACE15" block="O"
        character_FACE15,
        //% blockId="character_FACE16" block="P"
        character_FACE16,
        //% blockId="character_FACE17" block="Q"
        character_FACE17,
        //% blockId="character_FACE18" block="R"
        character_FACE18,
        //% blockId="character_FACE19" block="S"
        character_FACE19,
        //% blockId="character_FACE20" block="T"
        character_FACE20,
        //% blockId="character_FACE21" block="U"
        character_FACE21,
        //% blockId="character_FACE22" block="V"
        character_FACE22,
        //% blockId="character_FACE23" block="W"
        character_FACE23,
        //% blockId="character_FACE24" block="X"
        character_FACE24,
        //% blockId="character_FACE25" block="Y"
        character_FACE25,
        //% blockId="character_FACE26" block="Z"
        character_FACE26,
    }

    let A = pins.createBuffer(17);
    let B = pins.createBuffer(17);
    let C = pins.createBuffer(17);
    let D = pins.createBuffer(17);
    let E = pins.createBuffer(17);
    let F = pins.createBuffer(17);
    let G = pins.createBuffer(17);
    let H = pins.createBuffer(17);
    let I = pins.createBuffer(17);
    let J = pins.createBuffer(17);
    let K = pins.createBuffer(17);
    let L = pins.createBuffer(17);
    let M = pins.createBuffer(17);
    let N = pins.createBuffer(17);
    let O = pins.createBuffer(17);
    let P = pins.createBuffer(17);
    let Q = pins.createBuffer(17);
    let R = pins.createBuffer(17);
    let S = pins.createBuffer(17);
    let T = pins.createBuffer(17);
    let U = pins.createBuffer(17);
    let V = pins.createBuffer(17);
    let W = pins.createBuffer(17);
    let X = pins.createBuffer(17);
    let Y = pins.createBuffer(17);
    let Z = pins.createBuffer(17);

    const A1: number[] = [0x0, 0x1, 0x0, 0x2, 0x80, 0x4, 0x40, 0x8, 0x20, 0x1f, 0xf0, 0x20, 0x8, 0x40, 0x4, 0x0, 0x0];
    const B1: number[] = [0x0, 0x1, 0xe0, 0x2, 0x20, 0x2, 0x20, 0x1, 0xe0, 0x2, 0x20, 0x2, 0x20, 0x2, 0x20, 0x1, 0xe0];
    const C1: number[] = [0x0, 0x1, 0xe0, 0x2, 0x10, 0x0, 0x10, 0x0, 0x10, 0x0, 0x10, 0x0, 0x10, 0x2, 0x10, 0x1, 0xe0];
    const D1: number[] = [0x0, 0x1, 0xf0, 0x2, 0x10, 0x4, 0x10, 0x4, 0x10, 0x4, 0x10, 0x4, 0x10, 0x2, 0x10, 0x1, 0xe0];
    const E1: number[] = [0x0, 0x1, 0xf0, 0x0, 0x10, 0x0, 0x10, 0x1, 0xf0, 0x0, 0x10, 0x0, 0x10, 0x0, 0x10, 0x1, 0xf0];
    const F1: number[] = [0x0, 0x7, 0xe0, 0x0, 0x20, 0x0, 0x20, 0x3, 0xe0, 0x0, 0x20, 0x0, 0x20, 0x0, 0x20, 0x0, 0x20];
    const G1: number[] = [0x0, 0x1, 0xe0, 0x2, 0x10, 0x0, 0x10, 0x0, 0x10, 0x3, 0x90, 0x2, 0x10, 0x3, 0xe0, 0x2, 0x0];
    const H1: number[] = [0x0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x7, 0xe0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20];
    const I1: number[] = [0x0, 0x7, 0xc0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x7, 0xc0];
    const J1: number[] = [0x0, 0x7, 0xe0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x20, 0x0, 0xc0, 0x0, 0x0];
    const K1: number[] = [0x0, 0x4, 0x80, 0x2, 0x80, 0x1, 0x80, 0x1, 0x80, 0x2, 0x80, 0x4, 0x80, 0x8, 0x80, 0x0, 0x0];
    const L1: number[] = [0x0, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0xf, 0x80];
    const M1: number[] = [0x0, 0x20, 0x8, 0x30, 0x18, 0x28, 0x28, 0x24, 0x48, 0x22, 0x88, 0x21, 0x8, 0x20, 0x8, 0x20, 0x8];
    const N1: number[] = [0x0, 0x4, 0x8, 0x4, 0x18, 0x4, 0x28, 0x4, 0x48, 0x4, 0x88, 0x5, 0x8, 0x6, 0x8, 0x4, 0x8];
    const O1: number[] = [0x0, 0x1, 0xc0, 0x2, 0x20, 0x4, 0x10, 0x4, 0x10, 0x4, 0x10, 0x4, 0x10, 0x2, 0x20, 0x1, 0xc0];
    const P1: number[] = [0x0, 0x3, 0xe0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x3, 0xe0, 0x0, 0x20, 0x0, 0x20, 0x0, 0x20];
    const Q1: number[] = [0x0, 0x3, 0xc0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x5, 0x20, 0x6, 0x20, 0x7, 0xc0, 0x8, 0x0];
    const R1: number[] = [0x0, 0x0, 0xe0, 0x1, 0x20, 0x1, 0x20, 0x1, 0x20, 0x0, 0xe0, 0x0, 0x60, 0x0, 0xa0, 0x1, 0x20];
    const S1: number[] = [0x0, 0x3, 0x80, 0x4, 0x40, 0x0, 0x40, 0x0, 0x80, 0x1, 0x0, 0x2, 0x0, 0x2, 0x20, 0x1, 0xc0];
    const T1: number[] = [0x0, 0xf, 0xe0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0];
    const U1: number[] = [0x0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x3, 0xc0, 0x0, 0x0];
    const V1: number[] = [0x0, 0x0, 0x0, 0x20, 0x8, 0x10, 0x10, 0x8, 0x20, 0x4, 0x40, 0x2, 0x80, 0x1, 0x0, 0x0, 0x0];
    const W1: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x41, 0x4, 0x22, 0x88, 0x14, 0x50, 0x8, 0x20, 0x0, 0x0, 0x0, 0x0];
    const X1: number[] = [0x0, 0x0, 0x0, 0x8, 0x20, 0x4, 0x40, 0x2, 0x80, 0x1, 0x0, 0x2, 0x80, 0x4, 0x40, 0x8, 0x20];
    const Y1: number[] = [0x0, 0x4, 0x10, 0x2, 0x20, 0x1, 0x40, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80];
    const Z1: number[] = [0x0, 0x1f, 0xe0, 0x8, 0x0, 0x4, 0x0, 0x2, 0x0, 0x1, 0x0, 0x0, 0x80, 0x0, 0x40, 0x1f, 0xe0];




    



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
}
