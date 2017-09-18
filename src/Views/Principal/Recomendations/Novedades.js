import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

import ClassCard from '../../../components/ClassCard.js';

export default class Novedades extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ClassCard
                    title={'Lectura Rápida'}
                    description={'Aprenderas a leer de una manera rápida entendiendo perfectamente. ¡Contrata Ya!'}
                    image={'lectura.jpg'}
                />
                <ClassCard
                    title={'Inglés'}
                    description={'Domina el Ingles y expande tus fronteras'}
                    image={'english.jpg'}
                />
                <ClassCard
                    title={'Matemáticas'}
                    description={'Prueba la clase de Matemáticas y vuelvete un experto. ¡Contrata Ya!'}
                    image={'matematicas.jpg'}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff'
    },
    content:{
        flex:0.5
    }
});
