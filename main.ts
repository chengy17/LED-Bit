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



    export enum characterExpression {
        
        //% blockId="character_FACE2" block="char_B"
        character_FACE2,


        //% blockId="character_FACE6" block="char_F"
        character_FACE6,


        //% blockId="character_FACE21" block="char_U"
        character_FACE21,
        //% blockId="character_FACE22" block="char_V"
        character_FACE22,
        //% blockId="character_FACE23" block="char_W"
        character_FACE23,
        //% blockId="character_FACE24" block="char_X"
        character_FACE24,
        //% blockId="character_FACE25" block="char_Y"
        character_FACE25,
        //% blockId="character_FACE26" block="char_Z"
        character_FACE26,
        
    }

    let B_show = pins.createBuffer(17);
    
    let zimuF_show = pins.createBuffer(17);
    

    let U_show = pins.createBuffer(17);
    let V_show = pins.createBuffer(17);
    let W_show = pins.createBuffer(17);
    let X_show = pins.createBuffer(17);
    let Y_show = pins.createBuffer(17);
    let Z_show = pins.createBuffer(17);






	const B1_show: number[] = [0x0, 0x1, 0xe0, 0x2, 0x20, 0x2, 0x20, 0x1, 0xe0, 0x2, 0x20, 0x2, 0x20, 0x2, 0x20, 0x1, 0xe0];

    const zimuF1_show: number[] = [0x0, 0x7, 0xe0, 0x0, 0x20, 0x0, 0x20, 0x3, 0xe0, 0x0, 0x20, 0x0, 0x20, 0x0, 0x20, 0x0, 0x20];

    
    const U1_show: number[] = [0x0, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x4, 0x20, 0x3, 0xc0, 0x0, 0x0];
    const V1_show: number[] = [0x0, 0x0, 0x0, 0x20, 0x8, 0x10, 0x10, 0x8, 0x20, 0x4, 0x40, 0x2, 0x80, 0x1, 0x0, 0x0, 0x0];
    const W1_show: number[] = [0x0, 0x0, 0x0, 0x0, 0x0, 0x41, 0x4, 0x22, 0x88, 0x14, 0x50, 0x8, 0x20, 0x0, 0x0, 0x0, 0x0];
    const X1_show: number[] = [0x0, 0x0, 0x0, 0x8, 0x20, 0x4, 0x40, 0x2, 0x80, 0x1, 0x0, 0x2, 0x80, 0x4, 0x40, 0x8, 0x20];
    const Y1_show: number[] = [0x0, 0x4, 0x10, 0x2, 0x20, 0x1, 0x40, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80, 0x0, 0x80];
    const Z1_show: number[] = [0x0, 0x1f, 0xe0, 0x8, 0x0, 0x4, 0x0, 0x2, 0x0, 0x1, 0x0, 0x0, 0x80, 0x0, 0x40, 0x1f, 0xe0];




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
            case characterExpression.character_FACE2: {
                B_show[0] = B1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    B_show[i] = B1_show[i + 1];
                    B_show[i + 1] = B1_show[i];
                }

                pins.i2cWriteBuffer(HT16K33_ADDRESS, B_show);
                break;
            }
            
            case characterExpression.character_FACE6: {
                zimuF_show[0] = zimuF1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    zimuF_show[i] = zimuF1_show[i + 1];
                    zimuF_show[i + 1] = zimuF1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, zimuF_show);
                break;
            }
            case characterExpression.character_FACE21: {
                U_show[0] = U1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    U_show[i] = U1_show[i + 1];
                    U_show[i + 1] = U1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, U_show);
                break;
            }
            case characterExpression.character_FACE22: {
                V_show[0] = V1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    V_show[i] = V1_show[i + 1];
                    V_show[i + 1] = V1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, V_show);
                break;
            }
            case characterExpression.character_FACE23: {
                W_show[0] = W1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    W_show[i] = W1_show[i + 1];
                    W_show[i + 1] = W1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, W_show);
                break;
            }
            case characterExpression.character_FACE24: {
                X_show[0] = X1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    X_show[i] = X1_show[i + 1];
                    X_show[i + 1] = X1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, X_show);
                break;
            }
            case characterExpression.character_FACE25: {
                Y_show[0] = Y1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    Y_show[i] = Y1_show[i + 1];
                    Y_show[i + 1] = Y1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, Y_show);
                break;
            }
            case characterExpression.character_FACE26: {
                Z_show[0] = Z1_show[0];
                for (let i = 1; i < 17; i += 2) {
                    Z_show[i] = Z1_show[i + 1];
                    Z_show[i + 1] = Z1_show[i];
                }
                pins.i2cWriteBuffer(HT16K33_ADDRESS, Z_show);
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
