import { StatusBar } from 'expo-status-bar';
import { ScrollView, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player';

export default function App() {

  LogBox.ignoreAllLogs(true);

  const [audioIndex, setarAudioIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audio, setarAudio] = useState(null);
  const [musicas, setarMusicas] = useState([
    
{
  nome: `It's Hard Life`,
  artista: 'Queen',
  playing:false,
  file: require('./musicas/hardLife.mp3')
},

{
  nome: 'Patience',
  artista: "Guns N' Roses",
  playing:false,
  file: require('./musicas/patience.mp3')
}, 

{
  nome: 'Pense em Mim',
  artista: 'Leandro & Leonardo',
  playing:false,
  file: require('./musicas/penseEmMim.mp3')
},

{
  nome: 'Green River',
  artista: 'Creedence Clearwater Revival',
  playing:false,
  file: require('./musicas/greenRiver.mp3')
},

{
  nome: 'The Lazy Song',
  artista: 'Bruno Mars',
  playing:false,
  file: require('./musicas/lazySong.mp3')
}, 

{
  nome: 'Straight From The Heart',
  artista: 'Bryan Adams',
  playing:false,
  file: require('./musicas/theHeart.mp3')
},

  ]);

  const changeMusic = async (id) =>{
     let curFile = null;
     let newMusics= musicas.filter((val, k)=>{
      if(id == k){
        //Toca a música aqui
        musicas[k].playing = true;
        curFile = musicas[k].file;
        setPlaying(true);
        setarAudioIndex(id);
        
      }else{
         musicas[k].playing = false;
      }
       return musicas[k];

     })

     if(audio != null){
        audio.unloadAsync();
     }

     //Instancia o Audio
     let curAudio = new Audio.Sound();

     try{

      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();

     }catch(error){}
  
     setarAudio(curAudio);
     setarMusicas(newMusics);
  }

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
      <Text style={styles.cabecalhoPrincipal}>MyMusic | Vitor</Text>
      </View>

      <View style={styles.table}>
        <Text style={styles.cabecalhoPlayer}>Música</Text>
        <Text style={styles.cabecalhoPlayer}>Artista</Text>
      </View>

      {
        musicas.map((val, k)=>{
             if(val.playing){                
                return(
                <View style={styles.table}>
                  <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                    <Text style={styles.tableTextSelected}><AntDesign name="play" size = {15} style={styles.botaoTocando}> 
                    </AntDesign>{val.nome}</Text>
                    <Text style={styles.tableTextSelected}>{val.artista}</Text>
                  </TouchableOpacity>
                </View>
                );
             }else{                
                return(
                  <View style={styles.table}>
                  <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                    <Text style={styles.tableText}><AntDesign style={styles.player} size = {15} name="play"/>{val.nome}
                    </Text>
                    <Text style={styles.tableText}>{val.artista}</Text>
                  </TouchableOpacity>
                </View>
                  );
             }
        })
      }
      <View style={{paddingBottom:200}}></View>
      
      </ScrollView>

      <Player playing={playing} setPlaying={setPlaying} setarAudioIndex={setarAudioIndex} audioIndex={audioIndex} 
      musicas={musicas} setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}>
     </Player>
      </View>
    
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#262626',
},

cabecalhoPlayer:{
  width:'50%',
  fontSize: 25,
  color:'rgb(200, 200, 200)'
},

cabecalhoPrincipal:{
  textAlign:'center',
  color:'white',
  fontSize:25,
  color:'rgb(200, 200, 200)'
},

header:{
  backgroundColor:"#cf081c",
  width:'100%',
  padding:20,
  marginRight:10
},

botaoTocando:{
  color:"#cf081c",
  marginRight: 6,
},

table:{
  flexDirection:'row',
  padding:20,
  borderBottomColor: "#cf081c",
  borderBottomWidth:2,
  },

tableTextSelected:{
  width:'50%',
  color:'white',
},

tableText:{
  width:'50%',
  color:'white'
},

player:{
  color:"black",
  marginRight: 10
},

});

