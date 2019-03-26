// @flow
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { formatCredits } from 'lbry-redux'
import Address from 'component/address';
import Button from 'component/button';
import Colors from 'styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import floatingButtonStyle from 'styles/floatingButton';

type Props = {
  balance: number,
};

class FloatingWalletBalance extends React.PureComponent<Props> {
  render() {
    const { balance, navigation, unclaimedRewardAmount } = this.props;

    return (
      <View style={[floatingButtonStyle.view, floatingButtonStyle.bottomRight]}>
        <TouchableOpacity style={floatingButtonStyle.container}
                          onPress={() => navigation && navigation.navigate({ routeName: 'WalletStack' })}>
          {isNaN(balance) && <ActivityIndicator size="small" color={Colors.White} />}
          <Text style={floatingButtonStyle.text}>
            {(balance || balance === 0) && (formatCredits(parseFloat(balance), 2) + ' LBC')}
          </Text>
        </TouchableOpacity>
        {unclaimedRewardAmount > 0 &&
        <TouchableOpacity style={floatingButtonStyle.pendingContainer}
          onPress={() => navigation && navigation.navigate({ routeName: 'Rewards' })} >
          <Icon name="award" size={18} style={floatingButtonStyle.rewardIcon} />
          <Text style={floatingButtonStyle.text}>{unclaimedRewardAmount}</Text>
        </TouchableOpacity>}
      </View>
    );
  }
}

export default FloatingWalletBalance;
