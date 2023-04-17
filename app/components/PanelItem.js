import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableHighlight, View,Share  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { executeSql } from '../constants';
import { useFocusEffect } from '@react-navigation/native';

export const windowWidth = Dimensions.get('window').width;

export const dividerColor = StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)';
export const dividerStyle = { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: dividerColor };

let defaultProps = {
    style: {},
    imageStyle: {},
    infoStyle: {},

    contextStyle: {},
    titleStyle: {},
    subtextStyle: {},

    size: null,
    horizontal: false,
    right: false,
    grid: false,
    wrapper: false
};

// const ArticleImage = ({ horizontal, image, size, grid }) => {
//     let imageStyle = (size === 'large' && grid === true) ? { height: 150 } : {};

//     let imageContainerStyles = [styles.imageContainer, horizontal && styles.horizontalImage];
//     let imageStyles = [styles.image, imageStyle, horizontal && styles.horizontalImage];

//     let Component = (image) ? Image : View;
//     let props = (image) ? { source: { uri: image } } : {};

//     return (
//         <View style={[imageContainerStyles]}>
//             <Component style={[imageStyles]} {...props} />
//         </View>
//     )
// };
const imageUrls = [
    'https://tse2.mm.bing.net/th?id=OIP.1KTqdLL_LZfHHI4UadkrfgHaEL&pid=Api&P=0',
    'https://tse1.mm.bing.net/th?id=OIP.qgEya9Oy0iws6D9echlUqAHaEK&pid=Api&P=0',
    'https://tse2.mm.bing.net/th?id=OIP.0-KmF3ALzi-_YlkM0l9pUQHaFN&pid=Api&P=0',
    'https://tse1.mm.bing.net/th?id=OIP.9H_Fexor2Nn7Srk2U7IcEwHaEK&pid=Api&P=0',
    'https://tse1.mm.bing.net/th?id=OIP.x9XmFQRUelfpvS7lhJkwCAHaEK&pid=Api&P=0',
    'https://tse4.mm.bing.net/th?id=OIP._z0ZP7HATb0NnzY-OXIoxAHaE8&pid=Api&P=0',
    'https://tse2.mm.bing.net/th?id=OIP.c31B6d4c8atFHkr-ZujjqAHaEK&pid=Api&P=0',
    'https://tse1.mm.bing.net/th?id=OIP.xmaFgK2mUgQFnNZ3q4mhqgHaEK&pid=Api&P=0',
    'https://tse1.mm.bing.net/th?id=OIP.bvqzuRxHx0Mv29XZZRAU-wHaE8&pid=Api&P=0',
    'https://tse4.mm.bing.net/th?id=OIP.xitVNQRMGIFzpgGo_qFfUQHaEK&pid=Api&P=0',
    'https://tse3.mm.bing.net/th?id=OIP.2-h3CKyMBWj-RE-9YoJR3QHaEK&pid=Api&P=0',

  ];
  
const ArticleImage = ({ horizontal, image, size, grid, randomImageUrl}) => {
    let imageStyle = (size === 'large' && grid === true) ? { height: 150 } : {};

    let imageContainerStyles = [styles.imageContainer, horizontal && styles.horizontalImage];
    let imageStyles = [styles.image, imageStyle, horizontal && styles.horizontalImage];

    let Component = (image) ? Image : View;
    let props = (image) ? { source: { uri: randomImageUrl } } : {};
 
    return (
        <View style={[imageContainerStyles]}>
            <Image style={[imageStyles]} source={{ uri: randomImageUrl }} />
        </View>
    )
};

const getStyle = ({ horizontal, size, grid }) => {
    let pct = 0;
    let gutter = 8 * 3;

    // if (!horizontal && grid) pct = 1;
    // else

    if (!grid) {
        if (horizontal) pct = .85;
        else if (size === 'large') pct = .80;
        else if (size === 'small') pct = .50;
    }

    return pct > 0 ? { width: (windowWidth * pct) - gutter } : {};
};

export default function PanelItem(props) {
const [fav, setFav] = useState(false)
const [randomImageUrl, setRandomImageUrl] = useState('')
useFocusEffect(
    React.useCallback(() => {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
   const randomImageUrsl = imageUrls[randomIndex];
   setRandomImageUrl(randomImageUrsl)
        const selectQuery = 'SELECT url FROM fav';
        executeSql(selectQuery).then((result) => {
          const favImages = result._array.map((row) => row.url);
          const isFav = favImages.includes(props.item.url);
          setFav(isFav);
        }).catch((err) => {
          console.log('err', err);
        });
    }, [])
  );
    useEffect(()=> {
        const selectQuery = 'SELECT url FROM fav';
        executeSql(selectQuery).then((result) => {
          const favImages = result._array.map((row) => row.url);
          const isFav = favImages.includes(props.item.url);
          setFav(isFav);
        }).catch((err) => {
          console.log('err', err);
        });
    },[])

    const onShare = async () => {
        try {
          const result = await Share.share({
            message: `${props.item.url}`
          });
          if (result.action === Share.sharedAction) {
            console.log("Shared Successfully!");
          } else if (result.action === Share.dismissedAction) {
            console.log("Share cancelled");
          }
        } catch (error) {
          console.log(error.message);
        }
    }
    const { horizontal, right, wrapper } = props;
    const { infoStyle, contextStyle, titleStyle, subtextStyle } = props;
    const AddtoFav = () => {
        if (fav === true) {
          const DeleteQuery = "DELETE FROM fav WHERE url = ?";
          executeSql(DeleteQuery, [props.item?.url]).then(() => {
            console.log("Deleted");
            setFav(false);
          }).catch((error) => {
            console.log("err", error);
          });
        } else {
          const user = {
            author: props.item?.author ?? "",
            content: props.item?.content ?? "",
            description: props.item?.description ?? "",
            title: props.item?.title ?? "",
            url: props.item?.url ?? "",
            subtext: props.subtext ?? "",
            image: props.image ?? "",
            urlToImage: props.item?.urlToImage ?? "",
          };
          const insertQuery =
            "INSERT INTO fav (title, content, author, description, url, subtext, image, urlToImage) VALUES (?, ?, ?, ?, ?, ?, ?, ? )";
          executeSql(insertQuery, [
            user.title,
            user.content,
            user.author,
            user.description,
            user.url,
            user.subtext,
            user.image,
            user.urlToImage,
          ])
            .then((result) => {
              console.log("Data inserted successfully", user);
              setFav(true);
            })
            .catch((error) => {
              console.log("Error while inserting data:", error);
            });
        }
      };
      
    // const AddtoFav = () => {
    //     if(fav === true) {
    //         const DeleteQuery = 'DELETE FROM fav WHERE url = ?';
    //         executeSql(DeleteQuery, [props.item.url]).then(()=>{
    //             console.log('Deleted')
    //             setFav(false)
    //         }).catch((error)=>{
    //             console.log('err', error)
    //         })
    //     } else {
    //         const user = { author: props.item?.author, content: props.item?.content, description: props.item?.description, title: props.item?.title, url: props.item?.url, subtext: props.subtext, image: props.image, urlToImage: props.item.urlToImage };
    //         const insertQuery = 'INSERT INTO fav (title, content, author, description, url, subtext, image, urlToImage) VALUES (?, ?, ?, ?, ?, ?, ?, ? )';
    //         executeSql(insertQuery, [user.title, user.content, user.author, user.description, user.url, user.subtext, user.image, user.urlToImage]).then(result => {
    //             console.log('Data inserted successfully', user);
    //             setFav(true)
    //         })
    //             .catch(error => {
    //                 console.log('Error while inserting data:', error);
    //             });
    
    //     }
    // };
    let containerStyles = [styles.container, wrapper && styles.containerWrapper, getStyle(props)];
    let wrapperStyles = [{ flex: 1 }, horizontal && { flexDirection: "row" }];

    let infoStyles = [styles.info, horizontal ? { marginHorizontal: 8 } : { marginTop: 0 }, (wrapper && !horizontal) && { padding: 12 }, infoStyle];
    let contextStyles = [styles.context, contextStyle];
    let titleStyles = [styles.title, titleStyle];
    let subtextStyles = [styles.subtext, subtextStyle];

    return (
        <View style={containerStyles}>
            <TouchableHighlight onPress={props.onPress} underlayColor="rgba(0, 0, 0, 0)">

                <View style={wrapperStyles}>
                    {/*Top and Left Image*/}
                    {(!right || !horizontal) && <ArticleImage {...props} randomImageUrl={randomImageUrl} />}

                    <View style={infoStyles}>

                        {props.context && <Text style={contextStyles} numberOfLines={1}>{props.context}</Text>}

                        {props.title &&
                            <Text style={titleStyles} numberOfLines={horizontal ? 2 : 3}>{props.title}</Text>}
                        {/* <Text style={titleStyles} numberOfLines={horizontal ? 2 : 3}>Buttin</Text> */}

                        <View style={{ flexDirection: "row", paddingVertical: 4 }}>
                            {props.subtext && <Text style={subtextStyles} numberOfLines={2}>{props.subtext}</Text>}
                            <View style={{ flex: 1 }} />
                        </View>

                    </View>

                    {/*Right Image*/}
                    {right && horizontal && <ArticleImage {...props} />}
                </View>

            </TouchableHighlight>
            <View style={{ flexDirection: 'row' , padding:14}}>
    <TouchableOpacity onPress={AddtoFav}>
      <Image style={{ width: 20, height: 20, tintColor: fav ? 'red' : 'grey' }} source={require('../../assets/heart.png')} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onShare} style={{marginLeft:12}}>
    <Image style={{ width: 20, height: 20 }} source={require('../../assets/share.png')} />
    </TouchableOpacity>
  </View>   
        </View>
    );
};
PanelItem.defaultProps = defaultProps;


//STYLES
let font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
let MIN_HEIGHT = 105;

const styles = StyleSheet.create({
    container: {
        borderRadius: 8, flex: 1
    },

    containerWrapper: {
        backgroundColor: "#fff",
        shadowColor: "#c2c4cb",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.81,
        shadowRadius: 5.16,
        elevation: 20
    },

    imageContainer: {
        backgroundColor: '#eee',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        overflow: "hidden"
    },

    horizontalImage: {
        width: MIN_HEIGHT,
        height: MIN_HEIGHT,
    },

    image: {
        height: MIN_HEIGHT
    },

    info: {
        justifyContent: "center", flex: 1,
        paddingTop: 8
    },

    context: {
        color: '#D66215',
        marginBottom: 4,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: font,
    },

    title: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: font,
        color: '#363434',
        marginBottom: 6,
        flex: 1
    },

    subtext: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: font,
        color: '#A5A5A4',
        marginRight: 5
    },

    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "flex-end",
        borderRadius: 8,
    },

    columns: {
        flexDirection: "row",
        alignItems: "center"
    }
});