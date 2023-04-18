import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React , { useState } from 'react'; 
import {AntDesign} from '@expo/vector-icons';
import {Audio} from 'expo-av';


export default function Player(props) {

  const handleBack = async ()=>{

    let newIndex = props.audioIndex -1;
    if(newIndex < 0){
      newIndex = props.musicas.lenght -1;
    }
    props.setarAudioIndex(newIndex);
    
    let curFile = props.musicas[newIndex].file;
  
      let newMusics=  props.musicas.filter((val, k)=>{
      if(newIndex== k){       
        props.musicas[k].playing = true;
        curFile = props.musicas[k].file;
        
      }else{
         props.musicas[k].playing = false;      }

       return props.musicas[k];

     })
        if(props.audio != null){
          props.audio.unloadAsync();
        }
        let curAudio = new Audio.Sound();
        try{
          await curAudio.loadAsync(curFile);
          await curAudio.playAsync();
      }catch(error){}

      props.setarAudio(curAudio);
      props.setarMusicas(newMusics);
      props.setPlaying(true);
  }

  const handleNext = async ()=>{
     
        let newIndex = props.audioIndex + 1;
        if(newIndex >= props.musicas.lenght ){
          newIndex = 0;
        }
        props.setarAudioIndex(newIndex);
        
        let curFile = props.musicas[newIndex].file;

      //Atualizar interface do App
        let newMusics=  props.musicas.filter((val, k)=>{
          if(newIndex== k){       
            props.musicas[k].playing = true;
            curFile = props.musicas[k].file;
            
          }else{
            props.musicas[k].playing = false;      }

          return props.musicas[k];

        })

        //Reproduzir Audio em questão
            if(props.audio != null){
              props.audio.unloadAsync();
            }
            let curAudio = new Audio.Sound();
            try{
              await curAudio.loadAsync(curFile);
              await curAudio.playAsync();
          }catch(error){}

          props.setarAudio(curAudio);
          props.setarMusicas(newMusics);
          props.setPlaying(true);
  }

  const handlePlay = async()=> {
     let curFile = props.musicas[props.audioIndex].file;
     let newMusics=  props.musicas.filter((val, k)=>{
      if(props.audioIndex == k){       
        props.musicas[k].playing = true;
        curFile = props.musicas[k].file;
        
      }else{
         props.musicas[k].playing = false;      }

       return props.musicas[k];

     })

     //Para reproduzir o som
     try {
        //Se caso ja tenha sido tocado alguma vez
        if(props.audio != null){
           props.setPlaying(true);
           props.setarMusicas(newMusics);
           await props.audio.playAsync();
        }
      
     } catch (error) {

        let curAudio = new Audio.Sound();
        try {
          //Reproduz o audio
          await curAudio.loadAsync(curFile);
          await curAudio.playAsync();
        } catch (error) {
          
        }
        props.setarAudio(curAudio);
        props.setarMusicas(newMusics);
        props.setPlaying(true);
     }
  }

  const handlePause = async() =>{
    if(props.audio!=null){
       props.audio.pauseAsync();    }
    props.setPlaying(false);
  }

  return(
   <View style={styles.player}>
    <TouchableOpacity onPress={()=>handleBack()}  style={{marginRight:20, marginLeft:20}}>
      <AntDesign name='banckward' size={35} color="white"></AntDesign>
    </TouchableOpacity>;
    {
       (!props.playing)?
    <TouchableOpacity  onPress={()=>handlePlay()} style={{marginRight:20, marginLeft:20}}>
      <AntDesign name='playcircleo' size={35} color="white"></AntDesign>
    </TouchableOpacity>
    : 
    <TouchableOpacity onPress={()=>handlePause()}  style={{marginRight:20, marginLeft:20}}>
      <AntDesign name='pausecircleo' size={35} color="white"></AntDesign>
    </TouchableOpacity>

   }

    <TouchableOpacity onPress={()=>handleNext()} style={{marginRight:20, marginLeft:20}}>
      <AntDesign name='forward' size={35} color="white"></AntDesign>
    </TouchableOpacity>

   </View>
  );
}
  const styles = StyleSheet.create({
    player:{
      width:'100%',
      height:100,
      position:'absolute',
      bottom:0,
      left:0,
      zIndex:999,
      backgroundColor:'#111',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    }
  })
    
