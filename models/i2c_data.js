// TDA7439 Three-band digitally-controlled audio processor
const i2c_bus               = "1";
// address of TDA7439
const i2c_addr                  = "0x44";
// Subaddresses used for selection of what to change
const i2c_subaddr_input_selector    = "0x00";
const i2c_subaddr_input_gain        = "0x01";
const i2c_subaddr_input_volume      = "0x02";
const i2c_subaddr_bass_gain         = "0x03";
const i2c_subaddr_mid_gain          = "0x04";
const i2c_subaddr_treble_gain       = "0x05";
const i2c_subaddr_speaker_att_right = "0x06";
const i2c_subaddr_speaker_att_left  = "0x07";

// corresponding input lines for chip, subaddr 0
const data_input_selector_in4   = 0;
const data_input_selector_in3   = 1;
const data_input_selector_in2   = 2;
const data_input_selector_in1   = 3;

// corresponding input gain values, subaddr 1
// might be changed to x/2
const data_input_gain_00db       = 0;
const data_input_gain_02db       = 1;
const data_input_gain_04db       = 2;
const data_input_gain_06db       = 3;
const data_input_gain_08db       = 4;
const data_input_gain_10db       = 5;
const data_input_gain_12db       = 6;
const data_input_gain_14db       = 7;
const data_input_gain_16db       = 8;
const data_input_gain_18db       = 9;
const data_input_gain_20db       = 10;
const data_input_gain_22db       = 11;
const data_input_gain_24db       = 12;
const data_input_gain_26db       = 13;
const data_input_gain_28db       = 14;
const data_input_gain_30db       = 15;

// corresponding volume values, subaddr 2
const data_volume_value_min       = 0;
const data_volume_value_max       = 47;
const data_volume_value_MUTE      = 56;

// corresponding gain values, subaddr 3+4+5
// Data bytes for Bass/Mid-tone/Treble gain value.
const data_dmt_gain_n14db         = 0;
const data_dmt_gain_n12db         = 1;
const data_dmt_gain_n10db         = 2;
const data_dmt_gain_n08db         = 3;
const data_dmt_gain_n06db         = 4;
const data_dmt_gain_n04db         = 5;
const data_dmt_gain_n02db         = 6;
const data_dmt_gain_000db         = 7;
const data_dmt_gain_p02db         = 14;
const data_dmt_gain_p04db         = 13;
const data_dmt_gain_p06db         = 12;
const data_dmt_gain_p08db         = 11;
const data_dmt_gain_p10db         = 10;
const data_dmt_gain_p12db         = 9;
const data_dmt_gain_p14db         = 8;

// corresponding speaker attenuation values, subaddr 6+7
const data_speaker_att_min       = 0;
const data_speaker_att_max       = 119;
const data_speaker_att_MUTE       = 120;

// running a process on the command line from nodejs requires 'child_process'
const exec = require('child_process').exec;
const databyte = 49;
const i2c_bytestring = i2c_bus + ' ' + i2c_addr + ' ' + i2c_subaddr_speaker_att_right + ' ' + databyte.toString(); // '1 0x44 0x06 49'
const child = exec('sudo i2cset -y ' + i2c_bytestring);
