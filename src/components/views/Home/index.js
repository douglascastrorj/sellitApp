import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { navigatorDrawer, navigatorDeepLink } from '../../utils/misc';
import HorizontalScroll from './horizontal_scroll_icons';

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      categories:['All', 'Sports', 'Music', 'Clothing', 'Eletronics'],
      categorySelected: "All"
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

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HorizontalScroll
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategoryHandler={this.updateCategoryHandler}
          />
        </View>
      </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop: 5,
  }
});


export default Home;