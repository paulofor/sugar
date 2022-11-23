package br.com.digicom.sugar.modelo;

import com.strongloop.android.loopback.Model;

public class RespostaFormulario extends Model{

	private int valorResposta;
	private int perguntaFormularioId;
	private int babyId;
	
	public int getValorResposta() {
		return valorResposta;
	}
	public void setValorResposta(int valorResposta) {
		this.valorResposta = valorResposta;
	}
	public int getPerguntaFormularioId() {
		return perguntaFormularioId;
	}
	public void setPerguntaFormularioId(int perguntaFormularioId) {
		this.perguntaFormularioId = perguntaFormularioId;
	}
	public int getBabyId() {
		return babyId;
	}
	public void setBabyId(int babyId) {
		this.babyId = babyId;
	}
	
	
}
