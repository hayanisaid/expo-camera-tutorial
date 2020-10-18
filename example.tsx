import {StatusBar} from 'expo-status-bar'
import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native'
import {Camera} from 'expo-camera'
const tag = '[CAMERA]'
export default function App() {
  const [hasPermission, setHasPermission] = useState<any>(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [startOver, setStartOver] = useState(true)
  const [type, setType] = useState(Camera.Constants.Type.back)
  let camera: Camera
  useEffect(() => {
    ;(async () => {
      const {status} = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])
  const __closeCamera = () => {
    setStartOver(true)
  }
  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }
  const __savePhoto = async () => {}
  return (
    <View
      style={{
        flex: 1
      }}
    >
      {startOver ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() => setStartOver(false)}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 1
          }}
        >
          {previewVisible ? (
            <ImageBackground
              source={{uri: capturedImage && capturedImage.uri}}
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  padding: 15,
                  justifyContent: 'flex-end'
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setPreviewVisible(false)}
                    style={{
                      width: 130,
                      height: 40,

                      alignItems: 'center',
                      borderRadius: 4
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20
                      }}
                    >
                      Re-take
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__savePhoto}
                    style={{
                      width: 130,
                      height: 40,

                      alignItems: 'center',
                      borderRadius: 4
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20
                      }}
                    >
                      save photo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          ) : (
            <Camera
              style={{flex: 1}}
              type={type}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: '5%',
                    right: '5%'
                  }}
                >
                  <TouchableOpacity onPress={__closeCamera}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 20
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: '5%',
                    left: '5%'
                  }}
                  onPress={() => {
                    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
                  }}
                >
                  <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}> Flip </Text>
                </TouchableOpacity>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
