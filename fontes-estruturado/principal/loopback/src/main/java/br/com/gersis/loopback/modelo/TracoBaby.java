package br.com.gersis.loopback.modelo;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.strongloop.android.loopback.Model;
import com.strongloop.android.remoting.BeanUtil;
import org.json.JSONObject;


public class TracoBaby extends Model {


	private double valorTotal;
	private int tracoPersonalidadeId;
	private String emailBaby;
	// Relacionamentos 1
	private Baby Baby;
	private TracoPersonalidade TracoPersonalidade;
	// Relacionamentos N

	public void setId(Long id) {
		this.setIdObjeto(id);
	}
	public void setId(Integer id) {
		this.setIdObjeto(id);
	}

	public int getIdInteger() {
		return new Integer(getId().toString());
	}
	public long getIdLong() {
		return new Long(getId().toString());
	}

	public JSONObject getJSON() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("id",getId());
			obj.put("valorTotal", valorTotal);
			obj.put("tracoPersonalidadeId", tracoPersonalidadeId);
			obj.put("emailBaby", emailBaby);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}


	public void setValorTotal(double valor) { 
		this.valorTotal = valor;
	}
	public double getValorTotal() { 
		return this.valorTotal;
	}
	public void setTracoPersonalidadeId(int valor) { 
		this.tracoPersonalidadeId = valor;
	}
	public int getTracoPersonalidadeId() { 
		return this.tracoPersonalidadeId;
	}
	public void setEmailBaby(String valor) { 
		this.emailBaby = valor;
	}
	public String getEmailBaby() { 
		return this.emailBaby;
	}

	public Baby getBaby() {
		return Baby;
	}
	public void setBaby(HashMap valor) {
		this.Baby = new Baby();
		BeanUtil.setProperties(this.Baby, (Map<String, ? extends Object>) valor, true);
	}
	public TracoPersonalidade getTracoPersonalidade() {
		return TracoPersonalidade;
	}
	public void setTracoPersonalidade(HashMap valor) {
		this.TracoPersonalidade = new TracoPersonalidade();
		BeanUtil.setProperties(this.TracoPersonalidade, (Map<String, ? extends Object>) valor, true);
	}
}
