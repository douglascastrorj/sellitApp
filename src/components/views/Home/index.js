import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { navigatorDrawer, navigatorDeepLink, gridTwoColumns } from '../../utils/misc';
import HorizontalScroll from './horizontal_scroll_icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import BlockItem from './blockitem';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../../Store/actions/articles_actions';

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      categories:['All', 'Sports', 'Music', 'Clothing', 'Eletronics'],
      categorySelected: "All",
      articles: []
    }

    this.props.navigator.setOnNavigatorEvent((event) => {
      navigatorDeepLink(event, this);
      navigatorDrawer(event, this);
    })
  }

  updateCategoryHandler = (categorySelected) => {
    this.setState({
      categorySelected
    })
  }

  componentDidMount(){
    this.props.getArticles('All').then( () => {
      console.log(this.props)
      const newArticles = gridTwoColumns(this.props.Articles.list);
      this.setState({
        isLoading: false,
        articles: newArticles
      })
     
    })
  }

  showArticles = () => (
    this.state.articles.map( (item,i) => (
      <BlockItem 

      key={`columnHome-${i}`}
      item={item}
      iteration={i}
      />
    ))
  )

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HorizontalScroll
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategoryHandler={this.updateCategoryHandler}
          />

          {
            this.state.isLoading ? 
            <View style={styles.isLoading}>
              <Icon name='gears' size={50} color='lightgrey'/>
              <Text style={{color:'lightgrey'}}>
                Loading...
              </Text>
            </View>
            :null
          }

          <View style={styles.articleContainer}>
            <View style={{flex:1}}>
              {this.showArticles()}
            </View>
          </View>

        </View>
      </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop: 5,
  },
  isLoading: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80
  },
  articleContainer:{
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

function mapStateToProps(state){
  return {
    Articles: state.Articles
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getArticles}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);