import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake'


export default function App() {
  const [toggle, setToggle] = useState(false);
  
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle)

  useEffect(()=>{
    //liga flash do celular
    Torch.switchState(toggle)
  },[toggle]);

  useEffect(()=>{
    //ouvir quando o celular balançar, será mudado o toggle
    const subscription =RNShake.addListener(()=>{
      handleChangeToggle(oldToggle => !oldToggle);
    });
    //Essa função será chamada quando o componentes
    //for desmontado
    return ()=> subscription.remove()//vai se auto remover como ouvinte
  },[]);

  return (
    <View style={toggle ? styles.containerLigth : styles.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
      <Image
        style = {toggle ? styles.lightingOn : styles.lightingOff}
        source={
          toggle 
          ? require("./assets/eco-light.png")
          : require("./assets/eco-light-off.png")
        }
      />
      <Image
        style = {styles.dioLogo}
        source={
          toggle 
          ? require("./assets/logo-dio.png")
          : require("./assets/logo-dio-white.png")
        }
      />
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLigth: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
