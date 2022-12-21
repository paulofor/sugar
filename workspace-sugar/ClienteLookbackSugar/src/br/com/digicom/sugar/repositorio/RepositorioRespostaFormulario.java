package br.com.digicom.sugar.repositorio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;

import com.strongloop.android.loopback.ModelRepository;
import com.strongloop.android.loopback.callbacks.EmptyResponseParser;
import com.strongloop.android.loopback.callbacks.VoidCallback;
import com.strongloop.android.remoting.adapters.RestContractItem;

import br.com.digicom.sugar.modelo.RespostaFormulario;

public class RepositorioRespostaFormulario extends ModelRepository<RespostaFormulario>{

	public RepositorioRespostaFormulario() {
		super("RespostaFormulario", RespostaFormulario.class);
	}
	@Override
	protected String verificaNomeUrl(String nome) {
		return "RespostaFormularios";
	}
	
	public void recebeResposta(final List<List<RespostaFormulario>> listaResposta, final VoidCallback callback ) {
		RestContractItem contrato = new RestContractItem("RespostaFormularios/recebeResposta","POST");
		this.getRestAdapter().getContract().addItem(contrato, "RespostaFormulario.recebeResposta");
        Map<String, Object> params = new HashMap<String, Object>();
        JSONArray lista = new JSONArray();
        for (List<RespostaFormulario> listaObj : listaResposta) {
        	JSONArray lista2 = new JSONArray();
        	for (RespostaFormulario resposta : listaObj) {
        		lista.put(resposta.getJSON());
        	}
        }
        params.put("listaResposta", lista);
        invokeStaticMethod("recebeResposta", params,   new EmptyResponseParser(callback));
	}
}
