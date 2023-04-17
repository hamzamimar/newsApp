import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Article(props) {
  
    const { article } = props.route.params;
    
    // Check if article url is empty or undefined
    if (!article.url) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>URL not available for this article.</Text>
            </View>
        );
    }

    return (
        <WebView source={{ uri: article.url }}
                 startInLoadingState={true}
                 onError={() => alert("Failed to load article.")}
                 renderLoading={() => <ActivityIndicator style={{paddingVertical: 8}}/>}/>
    );
    
};

Article.navigationOptions = ({props}) => {
    return {
        title: `${props.route.params.article.title}`,
        headerRight: null
    }
};
