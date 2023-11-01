package br.com.gersis.loopback.repositorio;


import java.util.HashMap;
import java.util.Map;
import java.util.List;
import org.json.JSONArray;

import com.strongloop.android.loopback.ModelRepository;
import com.strongloop.android.loopback.callbacks.JsonArrayParser;
import com.strongloop.android.loopback.callbacks.JsonObjectParser;
import com.strongloop.android.loopback.callbacks.EmptyResponseParser;
import com.strongloop.android.loopback.callbacks.ListCallback;
import com.strongloop.android.loopback.callbacks.ObjectCallback;
import com.strongloop.android.loopback.callbacks.VoidCallback;
import com.strongloop.android.remoting.adapters.RestContractItem;

import br.com.gersis.loopback.modelo.PerguntaFormulario;

public class RepositorioPerguntaFormulario extends ModelRepository<PerguntaFormulario> {

	public RepositorioPerguntaFormulario() {
		super("PerguntaFormulario", PerguntaFormulario.class);
	}
	@Override
	protected String verificaNomeUrl(String nome) {
		return "PerguntaFormulario";
	}


	// ***  Operações  ***

	public synchronized void listaAtiva(final ListCallback<PerguntaFormulario> callback ) {
		RestContractItem contrato = new RestContractItem("PerguntaFormularios/listaAtiva","GET");
		this.getRestAdapter().getContract().addItem(contrato, "PerguntaFormulario.listaAtiva");
		Map<String, Object> params = new HashMap<String, Object>();
		invokeStaticMethod("listaAtiva", params,   new JsonArrayParser<PerguntaFormulario>(this, callback));
	}


	private JSONArray obtemLista(List<PerguntaFormulario> listaEntrada) {
		JSONArray lista = new JSONArray();
		for (PerguntaFormulario item : listaEntrada) {
			lista.put(item.getJSON());
		}
		return lista;
	}
}
