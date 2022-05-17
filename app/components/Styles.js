import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    wrapper:
    {
        width: '100%',
        padding: 20,
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
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
    }
})