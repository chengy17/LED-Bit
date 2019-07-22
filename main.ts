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
        //% blockId="character_FACE9" block="char_I"
        character_FACE9,
        //% blockId="character_FACE10" block="char_J"
        character_FACE10,
        //% blockId="character_FACE11" block="char_K"
        character_FACE11,
        //% blockId="character_FACE12" block="char_L"
        character_FACE12,
        //% blockId="character_FACE13" block="char_M"
        character_FACE13,
        //% blockId="character_FACE14" block="char_N"
        character_FACE14,
        //% blockId="character_FACE15" block="char_O"
        character_FACE15,
        //% blockId="character_FACE16" block="char_P"
        character_FACE16,
        //% blockId="character_FACE17" block="char_Q"
        character_FACE17,
        //% blockId="character_FACE18" block="char_R"
        character_FACE18,
        //% blockId="character_FACE19" block="char_S"
        character_FACE19,
        //% blockId="character_FACE20" block="char_T"
        character_FACE20,


       
    }

    let A_show = pins.createBuffer(17);
    let B_show = pins.createBuffer(17);
    let C_show = pins.createBuffer(17);
    let D_show = pins.createBuffer(17);
    let E_show = pins.createBuffer(17);

    let G_show = pins.createBuffer(17);
    let H_show = pins.createBuffer(17);
    let I_show = pins.createBuffer(17);
    let J_show = pins.createBuffer(17);
    let K_show = pins.createBuffer(17);
    let L_show = pins.createBuffer(17);
    let M_show = pins.createBuffer(17);
    let N_show = pins.createBuffer(17);
    let O_show = pins.createBuffer(17);
    let P_show = pins.createBuffer(17);
    let Q_show = pins.createBuffer(17);
    let R_show = pins.createBuffer(17);
    let S_show = pins.createBuffer(17);
    let T_show = pins.createBuffer(17);

   





    const A1_show: number[] = [0x0, 0x1, 0x0, 0x2, 0x80, 0x4, 0x40, 0x8, 0x20, 0x1f, 0xf0, 0x20, 0x8, 0x40, 0x4, 0x0, 0x0];
    const B1_show: number[] = [0x0, 0x1, 0xe0, 0x2, 0x20, 0x2, 0x20, 0x1, 0xe0, 0x2, 0x20, 0x2, 0x20, 0x2, 0x20, 0x1, 0xe0];
    const C1_show: number[] = [0x0, 0x1, 0xe0, 0x2, 0x10, 0x0, 0x10, 0x0, 0x10, 0x0, 0x10, 0x0, 0x10, 0x2, 0x10, 0x1, 0xe0];
    const D1_show: number[] = [0x0, 0x1, 0xf0, 0x2, 0x10, 0x4, 0x10, 0x4, 0x10, 0x4, 0x10, 0x4, 0x10, 0x2, 0x10, 0x1, 0xe0];
    const E1_show: number[] = [0x0, 0x1, 0xf0, 0x0, 0x10, 0x0, 0x10, 0x1, 0xf0, 0x0, 0x10, 0x0, 0x10, 0x0, 0x10, 0x1, 0xf0];

    const G1_show: number[] = [0x0, 0x1, 0xe0, 0x2, 0x10, 0x0, 0x10, 0x0, 0x10, 0x3, 0x90, 0x2, 0x10, 0x3, 0xe0, 0x2, 0x0];
    const H1_show: number[] = [0x0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x7, 0xe0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20];
    const I1_show: number[] = [0x0, 0x7, 0xc0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x7, 0xc0];
    const J1_show: number[] = [0x0, 0x7, 0xe0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x20, 0x0, 0xc0, 0x0, 0x0];
    const K1_show: number[] = [0x0, 0x4, 0x80, 0x2, 0x80, 0x1, 0x80, 0x1, 0x80, 0x2, 0x80, 0x4, 0x80, 0x8, 0x80, 0x0, 0x0];
    const L1_show: number[] = [0x0, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0xf, 0x80];
    const M1_show: number[] = [0x0, 0x20, 0x8, 0x30, 0x18, 0x28, 0x28, 0x24, 0x48, 0x22, 0x88, 0x21, 0x8, 0x20, 0x8, 0x20, 0x8];
    const N1_show: number[] = [0x0, 0x4, 0x8, 0x4, 0x18, 0x4, 0x28, 0x4, 0x48, 0x4, 0x88, 0x5, 0x8, 0x6, 0x8, 0x4, 0x8];
    const O1_show: number[] = [0x0, 0x1, 0xc0, 0x2, 0x20, 0x4, 0x10, 0x4, 0x10, 0x4, 0x10, 0x4, 0x10, 0x2, 0x20, 0x1, 0xc0];
    const P1_show: number[] = [0x0, 0x3, 0xe0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x3, 0xe0, 0x0, 0x20, 0x0, 0x20, 0x0, 0x20];
    const Q1_show: number[] = [0x0, 0x3, 0xc0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x5, 0x20, 0x6, 0x20, 0x7, 0xc0, 0x8, 0x0];
    const R1_show: number[] = [0x0, 0x0, 0xe0, 0x1, 0x20, 0x1, 0x20, 0x1, 0x20, 0x0, 0xe0, 0x0, 0x60, 0x0, 0xa0, 0x1, 0x20];
    const S1_show: number[] = [0x0, 0x3, 0x80, 0x4, 0x40, 0x0, 0x40, 0x0, 0x80, 0x1, 0x0, 0x2, 0x0, 0x2, 0x20, 0x1, 0xc0];
    const T1_show: number[] = [0x0, 0xf, 0xe0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0, 0x1, 0x0];


    







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
        i2ccmd(HT16K33_ADDRESS, 0x21);
        i2ccmd(HT16K33_ADDRESS, HT16K33_BLINK_CMD | HT16K33_BLINK_DISPLAYON | (0 << 1));
        i2ccmd(HT16K33_ADDRESS, HT16K33_CMD_BRIGHTNESS | 0xF);
    }

    function matrixShow() {
        matBuf[0] = 0x00;
        pins.i2cWriteBuffer(HT16K33_ADDRESS, matBuf);
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
            case characterExpression.character_FACE9: {
                I_show[0] = I1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    I_show[i] = I1_show[i + 1];
                    I_show[i + 1] = I1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, I_show);
                break;
            }
            case characterExpression.character_FACE10: {
                J_show[0] = J1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    J_show[i] = J1_show[i + 1];
                    J_show[i + 1] = J1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, J_show);
                break;
            }
            case characterExpression.character_FACE11: {
                K_show[0] = K1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    K_show[i] = K1_show[i + 1];
                    K_show[i + 1] = K1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, K_show);
                break;
            }
            case characterExpression.character_FACE12: {
                L_show[0] = L1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    L_show[i] = L1_show[i + 1];
                    L_show[i + 1] = L1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, L_show);
                break;
            }
            case characterExpression.character_FACE13: {
                M_show[0] = M1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    M_show[i] = M1_show[i + 1];
                    M_show[i + 1] = M1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, M_show);
                break;
            }
            case characterExpression.character_FACE14: {
                N_show[0] = N1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    N_show[i] = N1_show[i + 1];
                    N_show[i + 1] = N1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, N_show);
                break;
            }
            case characterExpression.character_FACE15: {
                O_show[0] = O1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    O_show[i] = O1_show[i + 1];
                    O_show[i + 1] = O1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, O_show);
                break;
            }
            case characterExpression.character_FACE16: {
                P_show[0] = P1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    P_show[i] = P1_show[i + 1];
                    P_show[i + 1] = P1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, P_show);
                break;
            }
            case characterExpression.character_FACE17: {
                Q_show[0] = Q1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    Q_show[i] = Q1_show[i + 1];
                    Q_show[i + 1] = Q1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, Q_show);
                break;
            }
            case characterExpression.character_FACE18: {
                R_show[0] = R1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    R_show[i] = R1_show[i + 1];
                    R_show[i + 1] = R1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, R_show);
                break;
            }
            case characterExpression.character_FACE19: {
                S_show[0] = S1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    S_show[i] = S1_show[i + 1];
                    S_show[i + 1] = S1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, S_show);
                break;
            }
            case characterExpression.character_FACE20: {
                T_show[0] = T1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    T_show[i] = T1_show[i + 1];
                    T_show[i + 1] = T1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, T_show);
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
