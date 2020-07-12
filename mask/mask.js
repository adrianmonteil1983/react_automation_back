const buffer = [0b10001100, 0b00000001, 0b11111111];
const mask = 0b00000001;
const devices = [];
const test = buffer.map((val) => { 
        for(i=0; i<8; i++){
            let valMasked = (val & (mask << i));// example: i==2 -> 10001100 & 00000100 = 00000100 used to see where are the 1 in Val
            valMasked !== 0
            ? devices.push(valMasked >> Math.log2(valMasked))// allows us to extract only the bit we want, math.log2 extract the puissance
            : devices.push(0)                                // of the number valmasked and shift valMasked to the right to get the 1 and push it in the array. 
        }
    }
);