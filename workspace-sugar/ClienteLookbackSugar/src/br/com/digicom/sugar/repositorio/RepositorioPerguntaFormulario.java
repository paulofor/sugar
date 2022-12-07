package br.com.digicom.sugar.repositorio;

import java.util.HashMap;
import java.util.Map;

import com.strongloop.android.loopback.ModelRepository;
import com.strongloop.android.loopback.callbacks.JsonArrayParser;
import com.strongloop.android.loopback.callbacks.ListCallback;
import com.strongloop.android.remoting.adapters.RestContractItem;

import br.com.digicom.sugar.modelo.PerguntaFormulario;

public class RepositorioPerguntaFormulario extends ModelRepository<PerguntaFormulario>{

	public RepositorioPerguntaFormulario() {
		super("PerguntaFormulario", PerguntaFormulario.class);
	}
	@Override
	protected String verificaNomeUrl(String nome) {
		return "PerguntaFormularios";
	}
	
	public void listaAtivoPergunta(final ListCallback<PerguntaFormulario> callback ) {
		RestContractItem contrato = new RestContractItem("PerguntaFormularios/listaAtivoPergunta","GET");
		this.getRestAdapter().getContract().addItem(contrato, "PerguntaFormulario.listaAtivoPergunta");
        Map<String, Object> params = new HashMap<String, Object>();
        invokeStaticMethod("listaAtivoPergunta", params,   new JsonArrayParser<PerguntaFormulario>(this, callback));
	}
}
