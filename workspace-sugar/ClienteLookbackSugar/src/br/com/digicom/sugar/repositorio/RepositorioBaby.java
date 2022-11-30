package br.com.digicom.sugar.repositorio;

import com.strongloop.android.loopback.ModelRepository;

import br.com.digicom.sugar.modelo.Baby;

public class RepositorioBaby extends ModelRepository<Baby>{

	public RepositorioBaby() {
		super("RepositorioBaby", Baby.class);
	}
	@Override
	protected String verificaNomeUrl(String nome) {
		return "RepositorioBabys";
	}
}
