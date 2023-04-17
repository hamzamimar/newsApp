// // import React from 'react';
// // import { View, Text, ScrollView } from 'react-native';
// // import Panel from '../../components/Panel';
// // import PanelItem from '../../components/PanelItem';
// // import Article from '../../utils';
// // const Favorite = (props) => {
// //   const {navigate} = props.navigation;
// //   const onCTAPress = (category) => navigate("Articles", {category});
// //  const getFav = ()=>{
// //   const insertQuery = 'SELECT * FROM fav';      
// //   executeSql(insertQuery)
// // .then(result => {
// // console.log('Data inserted successfully', user);
// // })
// //     .catch(error => {
// //       console.log('Error while inserting data:', error);
// //     });
// //  }
// //   const renderItem = (size = 'small', horizontal = false, grid = false, wrapper = true) => {
// //     return ({item, index}) => {
// //         let article = new Article(item, navigate);
// //         return <PanelItem {...article} item={item} size={size} horizontal={horizontal} grid={grid} wrapper={wrapper}/>
// //     };
// // };


// //   let renderDefaultItem = renderItem();
// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Text>Favorite Screen</Text>
// //       <ScrollView style={{backgroundColor: "#fff"}}>
// //             <Panel title={"Business"}
// //                    data={business.articles.slice(0, 10)}
// //                    renderItem={renderDefaultItem}
// //                    onCTAPress={() => onCTAPress("Business")}/>
// //          </ScrollView>
// //     </View>
// //   );
// // };

// // export default Favorite;
// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView , TouchableOpacity} from 'react-native';
// import Panel from '../../components/Panel';
// import PanelItem from '../../components/FavPanel';
// import Article from '../../utils';
// import { executeSql } from '../../constants';
// import { useFocusEffect } from '@react-navigation/native';
// const Favorite = (props) => {
//   const { navigate } = props.navigation;

//   const [favorites, setFavorites] = useState([]);
//   const [del, setDel] = useState(false);

//   useFocusEffect(
//     React.useCallback(() => {
//       getFavorites();
//     }, [del])
//   );

//   const getFavorites = () => {
//     console.log('Data :');

//     const selectQuery = 'SELECT * FROM fav';      
//     executeSql(selectQuery)
//       .then(result => {
//         console.log('Data retrieved successfully:');
//         const favoriteArticles = [];
//         for (let i = 0; i < result._array.length; i++) {
//           favoriteArticles.push(result._array[i]);
//         }
//         setFavorites(favoriteArticles);
//         console.log('fav', favorites.image);

//       })
//       .catch(error => {
//         console.log('Error while retrieving data:', error);
//       });
//   };
  
//   const onCTAPress = (category) => navigate("Articles", {category});

//   const renderItem = (size = 'large', horizontal = false, grid = false, wrapper = true) => {
//     return ({item, index}) => {
//       let article = new Article(item, navigate);
//       return (
//         <>
//         <PanelItem {...article} item={item} size={size} horizontal={horizontal} grid={grid} wrapper={wrapper} setDel={setDel}/>
//                 </>
      
//       );    };
//   };

//   const renderDefaultItem = renderItem();

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor:'white'}}>
//       <ScrollView style={{backgroundColor: "#fff"}}>
//         <Panel  cols={1}
//           title={"Favorites"}
//           data={favorites}
//           renderItem={renderDefaultItem}
//           onCTAPress={() => console.log('press')}
//           ctaText=''
//         />
//       </ScrollView>
//     </View>
//   );
// };

// export default Favorite;
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView , TouchableOpacity} from 'react-native';
import Panel from '../../components/Panel';
import PanelItem from '../../components/FavPanel';
import Article from '../../utils';
import { executeSql } from '../../constants';
import { useFocusEffect } from '@react-navigation/native';

const Favorite = (props) => {
  const { navigate } = props.navigation;

  const [favorites, setFavorites] = useState([]);
  const [del, setDel] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getFavorites();
    }, [del])
  );

  const getFavorites = () => {
    const selectQuery = 'SELECT * FROM fav';      
    executeSql(selectQuery)
      .then(result => {
        const favoriteArticles = [];
        for (let i = 0; i < result._array.length; i++) {
          favoriteArticles.push(result._array[i]);
        }
        setFavorites(favoriteArticles);
      })
      .catch(error => {
        console.log('Error while retrieving data:', error);
      });
  };
  
  const onCTAPress = (category) => navigate("Articles", {category});

  const handleDelete = () => {
    setDel(!del);
  };

  const renderItem = (size = 'large', horizontal = false, grid = false, wrapper = true) => {
    return ({item, index}) => {
      let article = new Article(item, navigate);
      return (
        <PanelItem {...article} item={item} size={size} horizontal={horizontal} grid={grid} wrapper={wrapper} onDelete={handleDelete}/>
      );
    };
  };

  const renderDefaultItem = renderItem();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        {favorites.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No Favorite Items Added</Text>
          </View>
        ) : (
          <Panel
            cols={1}
            title={"Favorites"}
            data={favorites}
            renderItem={renderDefaultItem}
            onCTAPress={() => console.log('press')}
            ctaText=''
          />
        )}
      </ScrollView>
    </View>
  );
  
};

export default Favorite;
