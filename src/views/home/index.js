import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Alert, BackHandler} from 'react-native';
import {getInicialState} from './script';
import {styles} from './style';

export default function Home() {
  const [active, setActive] = useState('x');
  const [win, setWin] = useState(false);
  const [obj, setObj] = useState(getInicialState());

  useEffect(() => {
    checkWitn();
  }, [obj]);

  const checkWitn = () => {
    const data = ['o', 'x'];

    data.forEach(val => {
      let diagonalSuperior = '';
      let diagonalInferior = '';
      let allLinhe = '';

      const validLine = val + val + val;

      for (l = 0; l < obj.length; l++) {
        diagonalSuperior += obj[l][l];
        diagonalInferior += obj[l][obj.length - (l + 1)];

        let checkLinha = '';
        let checkCol = '';

        for (c = 0; c < obj.length; c++) {
          checkLinha += obj[l][c];
          checkCol += obj[c][l];
        }

        allLinhe += checkLinha + checkCol;

        if (checkCol === validLine) {
          setWin(true);
          alert('O vencedor é: ' + val);
          return;
        }

        if (checkLinha === validLine) {
          setWin(true);
          alert('O vencedor é: ' + val);
          return;
        }
      }

      if (diagonalSuperior == validLine) {
        setWin(true);
        alert('O vencedor é: ' + val);
        return;
      }

      if (diagonalInferior == validLine) {
        setWin(true);
        alert('O vencedor é: ' + val);
        return;
      }

      if (
        (diagonalSuperior.trim() + diagonalInferior.trim() + allLinhe.trim())
          .length === 24 &&
        win === false
      ) {
        Alert.alert(
          'Atenção!',
          'O jogo foi empate!',
          [
            {
              text: 'Reiniciar',
              onPress: () => handleRestart(true),
              style: 'cancel',
            },
            {text: 'Sair', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: true},
        );
      }
    });
  };

  const changeActive = () => {
    if (active == 'x') {
      setActive('o');
    } else {
      setActive('x');
    }
  };

  const handleExitApp = () => {
    Alert.alert(
      'Atenção!',
      'Esta preste a sair da aplicação ?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Sim', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
  };

  const handleRestart = restart => {
    if (!restart)
      Alert.alert(
        'Atenção!',
        'Vai reiniciar o jogo ?',
        [
          {
            text: 'Não',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => {
              setActive('x');
              setObj(getInicialState());
            },
          },
        ],
        {cancelable: false},
      );
    else setObj(getInicialState());

    setWin(false);
    setActive('x');
  };

  return (
    <View style={styles.view}>
      <View style={styles.banner}>
        <Text style={styles.textColorJogo}> O Jogo da Velha</Text>
        <Text style={styles.textColorJogo1}>By José Ndonge</Text>
      </View>
      <View style={styles.vwJogo}>
        <View>
          <Text style={styles.textColor1}>Apenas um jogador!...</Text>
        </View>
        <View style={styles.vwtable}>
          {obj.map((vet, i) => (
            <View key={i} style={styles.vwrow}>
              {vet.map((val, c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => {
                    const newData = [...obj];
                    if (win) {
                      Alert.alert(
                        'Atenção!',
                        'O jogo já terminou',
                        [
                          {
                            text: 'Reiniciar',
                            onPress: () => handleRestart(true),
                            style: 'cancel',
                          },
                          {text: 'Sair', onPress: () => BackHandler.exitApp()},
                        ],
                        {cancelable: false},
                      );
                      return;
                    }
                    if (newData[i][c] == '') {
                      newData[i][c] = active;
                      changeActive();
                      setObj(newData);
                    }
                  }}
                  style={styles.vwBtn}>
                  <Text key={c + 1} style={styles.textColorB}>
                    {obj[i][c]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.vwFooter}>
        <TouchableOpacity
          onPress={() => {
            handleRestart();
          }}
          style={[styles.btnVw, styles.btngreen]}>
          <Text style={styles.textBtnExt}>Reiniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleExitApp();
          }}
          style={styles.btnVw}>
          <Text style={styles.textBtnExt}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
