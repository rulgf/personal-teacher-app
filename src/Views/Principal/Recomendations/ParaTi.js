import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

import ClassCard from '../../../components/ClassCard.js';


export default class ParaTi extends Component{
    constructor(props){
        super(props);

        this.state = {
            classes: {}
        }
    }

    /**
     * Funciones de navegación
     * */
    onClassPress(){

    }

    render(){
        return(
            <View style={styles.container}>
                <ClassCard
                    title={'Matemáticas'}
                    description={'Prueba la clase de Matemáticas y vuelvete un experto. ¡Contrata Ya!'}
                    image={'matematicas.jpg'}
                />
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
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex:1,
    },
    content:{
        flex:0.5
    }
});
