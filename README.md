# react-native-root-views

# Installation
```shell
npm install react-native-root-views --save
```

# Usage
```js
import { ActionSheet, Loading } from 'react-native-root-views';

// show loading
Loading.show();

// hide loading
Loading.hide();

ActionSheet.showActionSheetWithOptions(
  {
    options: ['拍照', '从相册选择', '取消'],
    cancelButtonIndex: 2,
    tintColor: '#2b3d54',
  },
  buttonIndex => {
    // do something
  },
);

```

# API
## ActionSheet
Same API as ActionSheetIOS

## Loading
### show()
show loading

### hide()
hide loading
