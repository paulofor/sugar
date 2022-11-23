package br.com.digicom.sugar.repositorio;

import com.strongloop.android.loopback.ModelRepository;

import br.com.digicom.sugar.modelo.RespostaFormulario;

public class RepositorioRespostaFormulario extends ModelRepository<RespostaFormulario>{

	public RepositorioRespostaFormulario() {
		super("RespostaFormulario", RespostaFormulario.class);
	}
	@Override
	protected String verificaNomeUrl(String nome) {
		return "RespostaFormularios";
	}
}
