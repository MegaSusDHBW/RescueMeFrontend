import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

module.exports = StyleSheet.create({
    wrapper: {
        padding: 20,
    },
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    fullWidth: {
        width: '100%',
    },
    halfWidth: {
        width: '50%',
    },
    fullHeight: {
        height: '100%',
    },
    marginForm: {
        marginHorizontal: 0,
        marginVertical: 5,
    },
    marginBottom: {
        marginBottom: 100,
    },
    paddingForm: {
        paddingHorizontal: 0,
        paddingVertical: 5,
    },
    paddingTop: {
        paddingTop: 70,
    },
    flexHorizontal: {
        display: 'flex',
        flexDirection: 'row',
    },
    flexStart: {
        justifyContent: 'flex-start',
    },
    flexBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textLeft: {
        textAlign: 'left',
    },
    textCenter: {
        textAlign: 'center',
    },
    dividerTop: {
        borderTopColor: Colors.primary,
        borderTopWidth: 3,
    },
    dividerBot: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 3,
    },
})