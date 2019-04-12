
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getImages } from '../api/imageViewApi';

class ImageView extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            columns: 1
        };
        this.changeView = this.changeView.bind(this);
    }
    async componentDidMount() {
        let result = await getImages();
        await this.setState({ dataSource: [...result] });
    }
    async  changeView() {
        let presentColumn = this.state.columns;
        if (presentColumn === 1) {
            await this.setState({ columns: 2 });
        } else if (presentColumn === 2) {
            await this.setState({ columns: 4 });
        } else if (presentColumn === 4) {
            await this.setState({ columns: 1 });
        }
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <TouchableOpacity onPress={this.changeView} style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('2%') }}>
                    <View style={{ width: wp('30%'), height: hp('5%'), backgroundColor: '#ffffff', borderColor: 'black', borderWidth: 1, marginTop: hp('1.5%') }}>
                        <Text style={{ alignContent: 'center', textAlign: 'center', marginTop: hp('0.7%') }}>Change View</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, marginTop: hp('5%') }}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, flexDirection: 'column', margin: 5 }}>
                                <Image style={this.state.columns === 4 ? (styles.imageThumbnailFour) : (this.state.columns === 2 ? (styles.imageThumbnailDouble) : (styles.imageThumbnailSingle))} source={{ uri: item.urls.small }} />
                            </View>
                        )
                        }
                        //Setting the number of column
                        numColumns={this.state.columns}
                        key={this.state.columns}
                        keyExtractor={(item, index) => index
                        }
                    />
                </View>
            </View >
        );
    }
}

// Code for Styling
const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    imageThumbnailSingle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        borderRadius: hp('3%')
    },
    imageThumbnailFour: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: hp('3%')
    },
    imageThumbnailDouble: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('20%'),
        width: wp('40%'),
        borderRadius: hp('3%')
    },
})
export default ImageView;