# mongoose-types
Opinionated, simplified types for mongoose.js

# Usage

1. install this library

        yarn add @huddo/mongoose-types
        npm i @huddo/mongoose-types

1. delete the mongooose types

    See the [official Mongoose documentation](https://mongoosejs.com/docs/typescript.html#using-custom-bindings)

        {
          "postinstall": "rm ./node_modules/mongoose/types"
        }

1. Import these types

    Open your `tsconfig.json` file and add `typeRoots`:

        "compilerOptions": {
          "typeRoots": ["node_modules/@types", "node_modules/@huddo"],
        }
