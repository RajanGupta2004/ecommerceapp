import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from 'react-native';
import axios from 'axios';
import ProductsItem from '../components/ProductsItem';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
// Custom dropdown - no external library needed

const HomeScreen = () => {
  const list = [
    {
      id: '0',
      image: 'https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg',
      name: 'Home',
    },
    {
      id: '1',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg',
      name: 'Deals',
    },
    {
      id: '3',
      image:
        'https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg',
      name: 'Electronics',
    },
    {
      id: '4',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg',
      name: 'Mobiles',
    },
    {
      id: '5',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg',
      name: 'Music',
    },
    {
      id: '6',
      image: 'https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg',
      name: 'Fashion',
    },
  ];

  const images = [
    'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
  ];

  const deals = [
    {
      id: '20',
      title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
      oldPrice: 25000,
      price: 19000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg',
        'https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg',
      ],
      color: 'Stellar Green',
      size: '6 GB RAM 128GB Storage',
    },
    {
      id: '30',
      title:
        'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
      oldPrice: 74000,
      price: 26000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
      ],
      color: 'Cloud Navy',
      size: '8 GB RAM 128GB Storage',
    },
    {
      id: '40',
      title:
        'Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger',
      oldPrice: 16000,
      price: 14000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg',
      ],
      color: 'Icy Silver',
      size: '6 GB RAM 64GB Storage',
    },
    {
      id: '42',
      title:
        'realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
      oldPrice: 12999,
      price: 10999,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg',
      ],
    },
  ];

  const offers = [
    {
      id: '0',
      title:
        'Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)',
      offer: '72% off',
      oldPrice: 7500,
      price: 4500,
      image:
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg',
      ],
      color: 'Green',
      size: 'Normal',
    },
    {
      id: '1',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg',
      ],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '2',
      title: 'Aishwariya System On Ear Wireless On Ear Bluetooth Headphones',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg',
      carouselImages: ['https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg'],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '3',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 24999,
      price: 19999,
      image: 'https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg',
      ],
      color: 'Norway Blue',
      size: '8GB RAM, 128GB Storage',
    },
  ];

  const windowWidth = Dimensions.get('window').width;

  // State for products and dropdown
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCategoryLabel, setSelectedCategoryLabel] =
    useState('All Categories');

  const navigation = useNavigation();

  // const cart = useSelector(state => state.cart.cart);
  // console.log('Cart', cart);

  const categories = [
    { label: 'All Categories', value: 'all' },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: 'Jewelery', value: 'jewelery' },
    { label: 'Electronics', value: 'electronics' },
    { label: "Women's Clothing", value: "women's clothing" },
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
        setFilteredProducts(res.data); // Initially show all products
      } catch (error) {
        console.log('Error fetch products:', error);
      }
    };

    fetchProductData();
  }, []);

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        product => product.category === selectedCategory,
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleCategorySelect = category => {
    setSelectedCategory(category.value);
    setSelectedCategoryLabel(category.label);
    setDropdownOpen(false);
  };

  console.log('products', products);
  console.log('filtered products', filteredProducts);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#00CDE1',
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
              flex: 1,
              backgroundColor: 'white',
            }}
          >
            <Feather
              style={{ paddingLeft: 10 }}
              name="search"
              size={30}
              color="black"
            />
            <TextInput placeholder="search here..." />
          </Pressable>
          <Ionicons
            style={{ paddingLeft: 10 }}
            name="mic-sharp"
            size={30}
            color="black"
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#AFEEEE',
            padding: 10,
          }}
        >
          <Entypo style={{ paddingLeft: 10 }} name="location-pin" size={30} />
          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: '500' }}>
              Delivered here Rajan - Mumbai 400076
            </Text>
          </Pressable>

          <Entypo style={{ paddingLeft: 10 }} name="chevron-down" size={30} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable
              key={index}
              style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ width: 50, height: 50, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: '500',
                  marginTop: 5,
                }}
              >
                {item?.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: 'red', width: '100%', height: 250 }}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              style={{
                width: windowWidth,
                height: '100%',
                height: 250,
                resizeMode: 'cover',
              }}
              source={{ uri: img }}
            />
          ))}
        </ScrollView>

        <Text style={{ padding: 10, fontSize: 22, fontWeight: 'bold' }}>
          Trending Deals of the weeks
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {deals.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Info', {
                  id: item?.id,
                  title: item?.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item.oldPrice,
                  item: item,
                })
              }
              key={item.id}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Image
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />
            </Pressable>
          ))}
        </View>

        <Text
          style={{
            height: 1,
            borderWidth: 1,
            borderColor: 'gray',
            marginVertical: 10,
          }}
        />

        <Text style={{ padding: 10, fontSize: 22, fontWeight: 'bold' }}>
          Today's Deals
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Info', {
                  id: item?.id,
                  title: item?.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item.oldPrice,
                  item: item,
                })
              }
              key={item.id}
              style={{
                marginVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                style={{ width: 150, height: 150, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  backgroundColor: 'red',
                  width: 130,
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Upto {item.offer}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text
          style={{
            height: 1,
            borderWidth: 1,
            borderColor: 'gray',
            marginVertical: 10,
          }}
        />

        {/* Category Filter Section */}
        <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Filter by Category
          </Text>

          {/* Custom Dropdown */}
          <View style={{ position: 'relative', zIndex: 1000, width: '75%' }}>
            <Pressable
              onPress={() => setDropdownOpen(!dropdownOpen)}
              style={styles.dropdownButton}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedCategoryLabel}
              </Text>
              <Entypo
                name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#666"
              />
            </Pressable>

            {dropdownOpen && (
              <View style={styles.dropdownList}>
                {categories.map((category, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleCategorySelect(category)}
                    style={[
                      styles.dropdownItem,
                      selectedCategory === category.value &&
                        styles.selectedItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedCategory === category.value &&
                          styles.selectedItemText,
                      ]}
                    >
                      {category.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Products Grid */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            flexWrap: 'wrap',
            paddingHorizontal: 10,
            marginTop: 10,
          }}
        >
          {filteredProducts?.map((item, index) => (
            <ProductsItem key={item.id} item={item} />
          ))}
        </View>

        {/* Show message when no products found */}
        {filteredProducts.length === 0 && products.length > 0 && (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 16, color: 'gray' }}>
              No products found in this category
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
  selectedItemText: {
    color: '#1976d2',
    fontWeight: '600',
  },
});
