import React from 'react';
import { StyleSheet,View,Text,Image } from 'react-native';


const Logo = props => {
    return(
        <View style={styles.container}>
            <Text>hello</Text>
                    <Image source={require('../assets/src/logo.png')} style={{width: 280, height:45}} />

        </View>
    );
}


const styles = StyleSheet.create({
    container: {

        width:'100%',
        height:90,
     
     
        alignItems:'center',
        justifyContent:'center'
    },
});

export default Logo;