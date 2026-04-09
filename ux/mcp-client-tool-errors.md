# UX Copy — Erros: MCP Client · Configuração da Tool

## Agrupamento de erros

### Grupo A — Falha de conexão

**Erros cobertos**
- `mcp_model_connection_bad_gateway`

**Mensagem**
> Não foi possível conectar ao servidor MCP. Verifique a URL e tente novamente.

**CTA:** `Tentar novamente`

---

### Grupo B — Falha na autenticação

**Erros cobertos**
- `mcp_model_token_request_bad_gateway`
- `mcp_model_token_response_bad_gateway`
- `mcp_model_token_endpoint_bad_gateway`
- `mcp_model_token_parse_bad_gateway`

**Mensagem**
> Falha na autenticação com o servidor MCP. Verifique as credenciais configuradas e tente novamente.

**CTA:** `Tentar novamente`

---

### Grupo C — Token inválido

**Erros cobertos**
- `mcp_model_access_token_is_invalid`

**Mensagem**
> Token inválido ou sem permissão de acesso. Verifique o Token / API Key configurado acima.

**CTA:** nenhum — o usuário precisa corrigir os dados, não tentar de novo.

---

### Grupo D — Falha ao listar tools

**Erros cobertos**
- `mcp_model_tools_list_bad_gateway`

**Mensagem**
> O servidor MCP não retornou as tools disponíveis. Tente novamente.

**CTA:** `Tentar novamente`

---

## Resumo

| Grupo | Erros agrupados | Mensagem resumida | CTA |
|---|---|---|---|
| A | 1 | Falha de conexão — verificar URL | Tentar novamente |
| B | 4 | Falha na autenticação — verificar credenciais | Tentar novamente |
| C | 1 | Token inválido — corrigir Token / API Key | — |
| D | 1 | Falha ao listar tools | Tentar novamente |
