package br.com.digicom.sugar.repositorio;

import com.strongloop.android.loopback.ModelRepository;

import br.com.digicom.sugar.modelo.PerguntaFormulario;

public class RepositorioPerguntaFormulario extends ModelRepository<PerguntaFormulario>{

	public RepositorioPerguntaFormulario() {
		super("RepositorioPerguntaFormulario", PerguntaFormulario.class);
	}
	@Override
	protected String verificaNomeUrl(String nome) {
		return "RepositorioPerguntaFormularios";
	}
}
