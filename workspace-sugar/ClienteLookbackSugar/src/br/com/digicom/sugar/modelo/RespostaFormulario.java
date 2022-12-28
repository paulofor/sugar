package br.com.digicom.sugar.modelo;

import java.util.Collection;

import org.json.JSONObject;

import com.strongloop.android.loopback.Model;

public class RespostaFormulario extends Model{

	private int valorResposta;
	private int perguntaFormularioId;
	private int babyId;
	
	
	public JSONObject getJSON() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("valorResposta", valorResposta);
			obj.put("perguntaFormularioId", perguntaFormularioId);
			obj.put("babyId", babyId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	
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
