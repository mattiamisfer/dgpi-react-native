import React from 'react';
import { StyleSheet,View,Text,Image } from 'react-native';
import Palette from '../Color';


const MinLogo = props => {
    return(
        <View style={styles.container}>
                    <Image source={require('../assets/src/dgpi.png')} style={{width: 190, height:43}} />

        </View>
    );
}


const styles = StyleSheet.create({
    container: {

        width:'100%',
        height:90,


        alignItems:'center',
        justifyContent:'center',
        
    },
});

export default MinLogo;
