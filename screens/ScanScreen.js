import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }
  getCameraPermissions = async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    console.log({status});
    this.setState({
      hasCameraPermissions: status==="granted",
      scanned: false,
      buttonState: 'clicked'
    });
  }
  handleBarCodeScanned = async ({text, data})=>{
    const {buttonState} = this.state.buttonState;
    console.log(data);
    if(buttonState==='clicked'){
      this.setState({
        buttonState: 'normal',
        scannedData: data,
        scanned: true
      });
    }
  }

  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const scannedData = this.state.scannedData;
    const buttonState = this.state.buttonState;
    if(buttonState==='clicked' && hasCameraPermissions){
      return(
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
        />
      );
    }
    else if(buttonState==='normal'){
      return(
        <View style={styles.container}>

          <View>
            <Image source={require("../assets/barcode-scanner.jpg")}
              style = {{width:200, height:200}}/>
            <Text
              style={{textAlign:'center', fontSize:30}}>
              Bar Code Scanner
            </Text>
          </View>

          <TouchableOpacity
            style={styles.scanButton}
            onPress={()=>{this.getCameraPermissions()}}>
            <Text style={styles.scanButtonText}>Scan</Text>
          </TouchableOpacity>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }, 
  scanButton:{
    backgroundColor: '#444', 
    margin: 20,
    borderRadius: 5, 
    width: 150,
    height:45,
    alignItems:'center'
  },
  scanButtonText:{
    fontSize:30,
    alignSelf:'center',
    alignContent:'center',
    color:'#eee'
  }
});