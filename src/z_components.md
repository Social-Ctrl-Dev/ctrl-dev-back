# Guia de codigo

## Leer con detenimiento

- **pm_component**: Carpeta del componente
- get**Component**: Funcion del componente post, user, etc con el metodo GET
- router**Component**: Constante de Router()

<hr>

## Requerimientos

- Tener la extension [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Opcional [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

### Configurar y Uso **Prettier**

En archivo `settings.json` (Preferences: Open User Settings: JSON)

```javascript
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
}
```

Para usar Prettier

```
Ctrl + Shift + P -> Buscar 'Format Document'
```

<hr>

## Componentes - Controller

Ubicacion: `src/components/pm_component/controller.ts`

- **pmDemo** varia segun el componente
- Funciones para cada metodo (GET, POST, etc.)
- Importar funciones de respuesta **okTrue** & **okFalse**
- Nomenclatura funciones (reemplazar **Component**):

```javascript
import { okTrue, okFalse } from "../../responses";

export const getComponent = async (req,res) => ...

export const putComponent = async (req,res) => ...

export const getIDComponent = async (req,res) => ...

```

<hr>

## Componentes - Index

Ubicacion: `src/components/pm_component/index.ts`

- **pmDemo** varia segun el componente
- Importar funciones para cada metodo (GET, POST, etc.)
- Nomenclatura constante (reemplazar **Component**):

```javascript
const routerComponent = Router();
```

<hr>

## Componentes - Index raiz

Ubicacion: `src/components/index.ts`

- Importar y exportar las funciones hacia `src/index.ts` (reemplazar **Component**)

```javascript
export { default as routerComponent } from "./pm_component";
```

<hr>

## App raiz

Ubicacion: `src/app.ts`

- Importar rutas de Index Raiz
- Configurar rutas URL & Rutas de Componentes + Funciones (Reemplazar **endpoint**)

```javascript
import { routerComponent } from "./pm_component";

...

app.use('/endpoint', routerComponent)

```
