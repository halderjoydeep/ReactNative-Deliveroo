// import { useNavigation } from '@react-navigation/native';
// import { useLayoutEffect } from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Platform, ScrollView } from 'react-native';
import { Categories, Header, SearchBar, FeaturedRow } from '../components';
import { client } from '../sanity';

const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="featured"]{
      _id, name, short_description, orderRank,
        restaurants[]->{..., dishes[]->, type->{name}}
    }|order(orderRank)`
      )
      .then((data) => setFeaturedCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView
      className={`bg-white ${Platform.select({ android: 'pt-12' })}`}
    >
      <Header />
      <SearchBar />

      {/* Body */}
      <ScrollView
        className="bg-gray-100 mb-8"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Categories />
        {/* Featured Rows */}
        {featuredCategories.map((item) => (
          <FeaturedRow
            key={item._id}
            title={item.name}
            desc={item.short_description}
            restaurants={item.restaurants}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
