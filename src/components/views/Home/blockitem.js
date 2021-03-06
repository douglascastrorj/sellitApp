import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

const BlockItem = (props) => {


    const itemImage = () => (
        <View>
            <Image
                resizeMode={"cover"}
                style={styles.itemImage}
                source={{ uri: 'https://loremflickr.com/400/400/girl,brazil,dog' }}
            />
        </View>
    )

    const itemText = (item) => (
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextTitle}>
                {item.title}
            </Text>
            <Text style={styles.itemTextPrice}>
                $ {item.price}
            </Text>
        </View>
    )

    const block = ({ item, i }) => (
        <View style={styles.blockRow}>
            <TouchableOpacity
                style={{ flex: 2 }}
                onPress={() => alert('go to post')}
            >
                <View
                    style={[
                        styles.blockGridStyle,
                        styles.blockGridStyleLeft
                    ]}
                >
                    {itemImage()}
                    {itemText(item.blockOne)}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ flex: 2 }}
                onPress={() => alert('go to post')}
            >
                <View
                    style={[
                        styles.blockGridStyle,
                        styles.blockGridStyleRight
                    ]}
                >
                    {itemImage()}
                    {itemText(item.blockTwo)}
                </View>
            </TouchableOpacity>

        </View>
    )

    return (
        <View>
            {block(props)}
        </View>
    )
}


const styles = StyleSheet.create({
    blockRow: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between'
    },
    itemTextContainer: {
        padding: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#FF6444',
    },
    itemTextTitle: {
        fontFamily: 'Roboto-Black',
        color: '#4C4C4C',
        marginBottom: 5
    },
    itemTextPrice: {
        fontFamily: 'Roboto-Regular',
        color: '#00ADA9',
        marginBottom: 5
    },
    itemImage: {
        width: '100%',
        height: 200
    },
    blockGridStyle: {
        backgroundColor: '#f1f1f1'
    },
    blockGridStyleRight:{
        marginLeft: 2.5
    },
    blockGridStyleLeft:{
        marginRight: 2.5
    }

})


export default BlockItem;