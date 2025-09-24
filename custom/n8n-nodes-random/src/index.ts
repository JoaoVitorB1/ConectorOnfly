// Aqui você apenas exporta a(s) classe(s) de node que o n8n deve carregar.
import type { INodeType } from 'n8n-workflow';

import { Random } from './nodes/Random.node';

// O n8n procura por um export chamado `nodeClass`.
// Ao exportar a classe Random como nodeClass, o n8n registra esse node na inicialização.
export { Random as nodeClass };
