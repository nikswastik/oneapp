import React, { Component, useState, useEffect, useRef } from 'react'
import image from "./assets/image.png"
import gallery from "./assets/image-gallery.png"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { scanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
// import Animated, {
//   useAnimatedProps,
//   useSharedValue,
// } from 'react-native-reanimated';


// const AnimatedText = Animated.createAnimatedComponent(TextInput);
const App = () => {
  const camera = useRef(null);
  const [cameraPermission, setCameraPermission] = useState();
  const [open, setOpen] = useState(false);
  const [currentExample, setCurrentExample] = useState('take-photo');
  const [photoPath, setPhotoPath] = useState();
  const [snapshotPath, setSnapshotPath] = useState();
  const [videoPath, setVideoPath] = useState();
  const [types, setTypes] = useState(["Interior", "Exterior"])
  const [currentType, setCurrentType] = useState("Interior")

  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus);
    })();
  }, []);

  const RenderC = () => {
    if (cameraDevice == null) {
      return <ActivityIndicator size="large" color="#1C6758" />;
    }
    else {
      return <View style={{}}>
        <Camera
          ref={camera}
          style={[styles.camera, styles.photoAndVideoCamera]}
          device={cameraDevice}
          isActive
          photo
        />


      </View>
    }
  }
  const devices = useCameraDevices();
  const cameraDevice = devices.back;
  const handleTakePhoto = async () => {
    // alert("call")
    try {
      const photo = await camera.current.takePhoto({
        // flash: 'on',
      });
      console.log(photo, "photo")
      setPhotoPath(photo.path);
    } catch (e) {
      console.log(e);
    }
  };


  const typesHandler = (type) => {
    setCurrentType(type)
    let data = [...types]
    let remaing = data.filter((item, index) => {
      return item !== type
    })
    let updated = data.filter((item, index) => {
      return item == type
    })

    updated.push(remaing[0])
    setTypes(updated)
  }
  // 
  return (
    <View style={styles.container}>

      <RenderC />
      <View style={styles.bottomContainer}>
        <View style={styles.cameraType}>
          {types?.map((item, index) => {
            return <Text onPress={() => { typesHandler(item) }} style={{ marginLeft: 10, color: currentType == item ? "#767631" : "white" }}>{item}</Text>
          })}
        </View>

        <View style={styles.cameraAction}>
          <TouchableOpacity
            style={{
              borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
              width: 50,
              height: 50,
              backgroundColor: '#FFFF',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            underlayColor='#ccc'
            onPress={() => alert('Yaay!')}>
            <Image source={image} style={{ height: 50, width: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
              width: 50,
              height: 50,
              backgroundColor: '#FFFF',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            underlayColor='#ccc'
            onPress={() => alert('Yaay!')}>
            <TouchableOpacity style={{
              borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
              width: 45,
              height: 45,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <TouchableOpacity
                style={{
                  borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                  width: 40,
                  height: 40,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>

              </TouchableOpacity>

            </TouchableOpacity>
            {/* <Text> Mom, look, I am a circle! </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
              width: 50,
              height: 50,
              backgroundColor: '#FFFF',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            underlayColor='#ccc'
            onPress={() => alert('Yaay!')}>
            <Image source={gallery} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default App
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1
  },
  camera: {
    height: Dimensions.get('screen').height * 0.8,
    width: Dimensions.get("screen").width,
    alignSelf: 'center',
  },
  photoAndVideoCamera: {
    height: Dimensions.get('screen').height * 0.7,
  },
  btn: {
    backgroundColor: '#63995f',
    margin: 13,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },

  bottomContainer: {
    // flexDirection:"row",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.2,
    padding: 10
    // backgroundColor:"red"
  },

  cameraType: {
    flexDirection: "row",
    // justifyContent: "center",
    marginLeft: Dimensions.get("screen").width * 0.4,
    // backgroundColor:"red"

  },
  cameraAction: {
    // backgroundColor:"red",
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    position: 'absolute', //Here is the trick
    bottom: 1, //Here is the trick
    width: Dimensions.get("screen").width,
    padding: 10
  }


});