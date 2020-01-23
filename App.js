/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const API_KEY = "02de402be1971c38967021dbb3376d04";

class App extends Component  {

 

  myWet = async (e) => {
      e.preventDefault();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=${API_KEY}&units=metric`
      const api_call = await fetch(url)
      const data = await api_call.json();

      if (this.state.country && this.state.city) {
        this.setState({
          condition : {
            id: data.id,
            temperature: data.main.temp,
            city : data.name,
            country : data.sys.country,
            humidity : data.main.humidity,
            description: data.weather[0].description,            
          }
        })
      }
      else {
        this.setState({
          Error : 'No Values For State and City'
        })
      }
    
  }

  state = {
    city : '',
    country: '' , 
    Error : '' ,
    condition : {
      id: '',
      temperature : '',
      city : '',
      country : '',
      humidity : '',
      description : '',
      error : ''
    },
    
  }

   
  
  render () {


    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style = {styles.texts}>
                <TextInput
                  placeholder = "Enter your country"                  
                  onChangeText = {(text) => this.setState({country : text}) }
                  mode = 'outlined'
                  style = {styles.country}
                />
                <TextInput
                  placeholder = "Enter your state"                  
                  onChangeText = {(text) => this.setState({city : text}) }
                  mode = 'outlined'
                  style ={styles.city}
                />
                <TouchableOpacity style = {styles.btn} onPress = {(e) => this.myWet(e)}>
                  <Text> Click</Text>

                </TouchableOpacity>
                  <View style = {styles.results}>
                
                    <Text> {this.state.condition.country && <Text> Country is ~= {this.state.country} </Text>} </Text>  
                    <Text> {this.state.condition.city && <Text> City is ~= {this.state.city} </Text>} </Text>                     
                    <Text> {this.state.condition.humidity && <Text> humidity is ~= {this.state.condition.humidity} </Text>} </Text>  
                    <Text> {this.state.condition.temperature && <Text> Temperature is ~= {this.state.condition.temperature} </Text>} </Text>  
                    <Text> {this.state.condition.description && <Text> Description is ~= {this.state.condition.description} </Text>} </Text>        
                </View> 
              </View>               
                
            </View>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
 
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    alignItems : 'center',   

  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  texts : {    
    flex:1,
    alignItems : 'center',
    justifyContent : 'flex-start',
    backgroundColor: Colors.white,
    marginTop :40,
    
  },
  results : {
    width : 200,
    height : 200,
    
  },
  country : {
    height : 50,
    width : 200,
    borderColor : '#9a73ef',
    borderWidth : 1,
    padding: 3,    
    marginTop : 15    
  },
  city : {
    height : 50,
    width : 200,
    borderColor : '#9a73ef',
    borderWidth : 1,
    padding: 3,  
    marginTop : 15    
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  btn : {
    height : 50,
    width : 200,
    marginTop : 20,
    backgroundColor: '#9a73ef',
    justifyContent : "center",
    color : '#fff',
    

  }
});

export default App;
