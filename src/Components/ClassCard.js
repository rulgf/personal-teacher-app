import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyText from './MyText.js';

import * as firebase from 'firebase';

export default class ClassCard extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: this.props.title,
            description: this.props.description,
            image: this.props.image,
            url: ''
        }
    }

    componentDidMount(){
        this.obtainImage();
    }

    obtainImage(){
        var storage = firebase.storage().ref();
        storage.child('img/clases/'+ this.state.image).getDownloadURL().then((url) => {
            this.setState({url: url});
            console.log(url);
        })
    }

    render(){
        if(this.state.url != ''){
            return(
                <View style={styles.container}>
                    <TouchableOpacity style={styles.imageContainer}>
                        <View>
                            <Image
                                source={{uri: this.state.url}}
                                style={styles.image}
                            />
                            <View style={styles.heartView}>
                                <TouchableOpacity>
                                    <Ionicons name="ios-heart" size={40} color={'#005CB8'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>{this.state.title.toUpperCase()}</Text>
                        <Text style={styles.description}>{this.state.description}</Text>
                    </View>
                </View>
            );
        }else{
            return null;
        }

    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex:1,
        borderBottomWidth: 0.5,
        margin: 20
    },
    content:{
        flex:0.5
    },
    imageContainer:{
        alignContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: 300,
        height: 200
    },
    title:{
        fontSize: 20,
        backgroundColor: 'transparent',
        fontFamily: 'Champagne & Limousines',
        color: 'black',
        padding: 15
    },
    description:{
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Champagne & Limousines',
        color: 'black',
        paddingLeft: 15,
        paddingBottom: 20,
    },
    heartView:{
        position: 'absolute',
        right: 5,
        top: 0
    }
});